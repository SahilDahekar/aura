# 🛡️ Automated Unified Risk Assessment (AURA)

**AURA** is an **automated vulnerability assessment tool** designed to simplify, centralize, and automate your security scanning process. It integrates powerful tools like **OWASP ZAP** and **Nikto**, and allows you to extend its capabilities by adding as many tools as you need. With AURA, managing scans and reviewing vulnerability insights is a breeze — all within a single dashboard.

---

## 🚀 Features

### 🔧 **Tool Integrations**
- Pre-integrated with **OWASP ZAP** and **Nikto** for immediate usage.
- **Easily Extendable**: Add any vulnerability scanning tools to expand your security arsenal.

### 🎯 **Simplified Scan Management**
1. **Sign Up/Sign In**  
   Access the platform at [aura.parthbhattad.in](https://aura.parthbhattad.in).  
   Create an account or log in to get started.

2. **Create a New Scan**  
   - Input the required details (e.g., target URL) in the **New Scan** form.
   - Save the scan, which will appear in your **Your Scans** dashboard.

3. **Execute the Scan**  
   - Trigger the scan with a single click.  
   - Track its progress: **Pending**, **In Progress**, or **Completed**.

4. **View Results**  
   - Once the scan completes, view the results by clicking **View Results**.
   - Access detailed vulnerability insights categorized as:  
     🟥 **Critical**, 🟧 **High**, 🟨 **Low**.

5. **Slack Intergration**  
   - Once the scan completes, .the user will get a notification on his slack channel about status of the scan.
   ![Slack notifications](https://github.com/user-attachments/assets/50fb1a1b-29e4-4324-9900-badd851701a3)

     

   

### ⚡ **Automated Workflow**
- **Kestra-Powered Automation**  
  AURA leverages **Kestra** to automate the complete workflow, from initiating scans to fetching and displaying results.

### 📊 **Single Dashboard for Everything**
- Manage scans, execute tools, and review results from one unified interface.

---

## 🛠️ **Tech Stack**
- **Frontend**: React.js with **TypeScript**  
- **Backend**: Node.js  
- **Database**: MongoDB  
- **Automation**: Kestra  

---

## 📌 **Project Scope**
- **Scalability**: Add unlimited tools for vulnerability assessment.  
- **Custom Automation**: Utilize Kestra workflows for seamless integrations.  
- **Enhanced Insights**: Stay informed with categorized vulnerability data.

---

## 🚦 **Getting Started**

### 🖥️ **Prerequisites**
- **Node.js** (v16+)
- **MongoDB** (local or cloud instance)
- **Kestra** (installed and configured)

### 📋 **Setup Instructions**
1. **Clone the Repository**  
   ```bash
   git clone https://github.com/parthbhattad20/aura.git
   cd aura
   ```
2. **Install required dependencies in client and server folders**
   ```bash
   cd client 
   npm i
   ```
    ```bash
   cd server
   npm i
   ```
3. **Start client and sever**
   ```bash
   cd client 
   npm run dev
   ```
    ```bash
   cd server
   npm run dev
   ```
4. **Setup Kestra locally**

   Link to Kestra documentation -  https://kestra.io/docs/getting-started
   Kestra files are present in /kestra folder.
   Main flow is present in main.yaml file and subflow are present in rest of the files.
   Key points to note in case of running kestra locally
   - Bind mount for docker container in kestra's docker-compose.yaml file.
   - Make sure the path volume in kestra yaml files is set for your local system/os.
   - Same docker volume path in docker-compose.yaml and kestra flow yaml's.

   Sample Images of docker-compose.yaml config
   ![WhatsApp Image 2024-12-01 at 9 18 19 PM](https://github.com/user-attachments/assets/47118f5e-03f3-487f-bd08-b64c93788630)
   ![WhatsApp Image 2024-12-01 at 9 18 19 PM](https://github.com/user-attachments/assets/ffc0ce9d-1b9b-4516-aaeb-32468788496d)


   
5. **Change axios base url**

   Paste the below code to client/src/lib/api.ts
    ```ts
   import axios from "axios";

   export default axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
   });
   ```
7. **Change cookie domain to localhost**

   Paste the below code to client/src/lib/api.ts
    ```js
     res.clearCookie("token", {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
   ```
    ```js
     res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            domain: "localhost",
            maxAge: 60 * 60 * 1000,
            sameSite: "lax",
        });
   ```
8. **Change cors object in app.js**

   Paste the below code to server/app.js
    ```js
      const corsOptions = {
       origin: ['http://localhost:5173', 'http://localhost:8080'],
       credentials: true, 
       optionsSuccessStatus: 200
     }
   ```

---

## 🎥 **Demo**
   [AURA-Video Tutorial](https://drive.google.com/file/d/1xY6qr_EImDm1MnXsTIcBFLu4HhqM7vFW/view)   

---

    
   
   
    


   
   
