import  {Scan}  from "../models/User.js";
import yaml from "js-yaml"
import { v4 as uuidv4 } from 'uuid';


const generateConfig = (url, tool) => {
    // Validate inputs
    if (!url) {
      throw new Error("URL is required");
    }
    if (!tool) {
      throw new Error("Tool is required");
    }
  
    // Generate UUIDs for IDs
    const auraId = uuidv4();
    const postProcessingId = uuidv4();
  
    // Build the tasks array dynamically
    const tasks = [];
  
    if (tool.includes('owasp_zap')) {
      tasks.push({
        id: uuidv4(),
        type: "io.kestra.plugin.core.flow.Subflow",
        namespace: "scans",
        flowId: "owasp_zap",
        inputs: {
          link: "{{inputs.url}}",
        },
      });
    }
  
    if (tool.includes('nikto')) {
      tasks.push({
        id: uuidv4(),
        type: "io.kestra.plugin.core.flow.Subflow",
        namespace: "scans",
        flowId: "nikto",
        inputs: {
          link: "{{inputs.url}}",
        },
      });
    }
  
    // Add the main configuration structure
    return {
      id: auraId,
      namespace: "test",
      inputs: [
        {
          id: "url",
          type: "STRING",
          defaults: url,
        },
      ],
      tasks: [
        {
          id: "run-subflows",
          type: "io.kestra.plugin.core.flow.Parallel",
          tasks: tasks,
        },
        {
          id: postProcessingId,
          type: "io.kestra.plugin.core.debug.Return",
          format: "Subflows completed successfully!",
        },
      ],
    };
  };

  export const sccanRequest = async(req,res)=>{
    try {
        const { url,tool } = req.body;
        const email = res.locals.jwtData.email

        const scan = await Scan.create({tool,url,email,})

        if (!Array.isArray(tool)) {
            throw new Error("Tool must be an array of strings");
          }
      
          const config = generateConfig(url, tool);
          const yamlConfig = yaml.dump(config); 
      
  
          res.setHeader('Content-Type', 'text/yaml');
          res.send(yamlConfig);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
  }

  export const getScans = async(req,res)=>{
     const email = res.locals.jwtData.email
     try{
        const scans = Scan.find({email})
        res.staus(200).json(scans)
     }catch(err){
        res.status(500).json({message:"there was an error getting your scan requests "})
     }

  }

