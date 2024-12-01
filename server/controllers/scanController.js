import { Scan } from "../models/User.js";
import yaml from "js-yaml";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const generateConfig = (url, tool, name) => {
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

    if (tool.includes("owasp_zap")) {
        tasks.push({
            id: uuidv4(),
            type: "io.kestra.plugin.core.flow.Subflow",
            namespace: "scans",
            flowId: "owasp_zap",
            inputs: {
                link: url,
            },
        });
    }

    if (tool.includes("nikto")) {
        tasks.push({
            id: uuidv4(),
            type: "io.kestra.plugin.core.flow.Subflow",
            namespace: "scans",
            flowId: "nikto",
            inputs: {
                link: url,
            },
        });
    }

    // Add the main configuration structure
    return {
        id: auraId,
        namespace: name,
        inputs: [
            {
                id: "url",
                type: "STRING",
                defaults: "http://testphp.vulnweb.com",
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

export const scanRequest = async (req, res) => {
    try {
        console.log(req.body);
        const { url, tool, email, name } = req.body;
        console.log(tool);

        if (!Array.isArray(tool)) {
            throw new Error("Tool must be an array of strings");
        }

        const config = generateConfig(url, tool, name);
        console.log("config : ", config);
        const scan = await Scan.create({
            tool,
            url,
            userEmail: email,
            name: name,
            auraId: config.id,
        });
        console.log(scan);

        const yamlConfig = yaml.dump(config);

        const output = createKestraFlow(yamlConfig);
        console.log(output);

        // res.setHeader("Content-Type", "text/yaml");
        // res.send(yamlConfig);
        res.status(200).json({message:"scan created successfully",scan:scan})
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getScans = async (req, res) => {
    const email = res.locals.jwtData.email;  // Assuming email is in the decoded JWT
    try {
        // Ensure the result of the query is awaited
        const scans = await Scan.find({ userEmail: email });
        console.log(scans);

        // Send the response after the data is retrieved
       return  res.status(200).json(scans);
    } catch (err) {
        // Log the error for debugging
        console.error('Error getting scans:', err);

        // Send a more detailed error message
        res.status(500).json({
            message: "There was an error getting your scan requests.",
            error: err.message  // Include the error message for better debugging
        });
    }
};

const createKestraFlow = async (yamlConfig) => {
    try {
        const res = await axios.post(
            "http://localhost:8080/api/v1/flows", // Replace with your Kestra API URL
            yamlConfig,
            {
                headers: {
                    "Content-Type": "application/x-yaml", // Specify the content type
                },
            }
        );

        return res.data;
    } catch (error) {
        console.error(
            "Error posting flow:",
            error.response?.data || error.message
        );
    }
};

export const execKestraFlow = async (req,res) => {
  const {name,id} = req.body;
    try {
        const res = await axios.post(
            `http://localhost:8080/api/v1/executions/trigger/${name}/${id}`,
            {}, // Empty body since the documentation doesn't specify a required body
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                // Optional: you can add query parameters if needed
                params: {
                    wait: false, // Default as per the documentation
                },
            }
        );
        console.log(res.data)
        res.status(200).json({message:"execution success ",data:res.data})
    } catch (error) {
        console.error(
            "Error executing flow:",
            error.response?.data || error.message
        );
    }
};
