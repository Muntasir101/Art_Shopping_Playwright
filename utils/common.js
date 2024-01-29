import path from 'path';
import fs from 'fs';


export class commonFunctions{

randomEmail = () => {
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com']; // Add more domains if needed
    const randomString = Math.random().toString(36).substring(7);
    const randomDomain = domains[Math.floor(Math.random() * domains.length)]; 
    const email = `${randomString}@${randomDomain}`;
    return email;
  }

randomPassword = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
    let password = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    } 
    return password;
  }

  saveCredentialsToJson = (email, password) => {
    const credentials = {
      email,
      password,
    };

    const jsonString = JSON.stringify(credentials, null, 2);

    // Use path.join to ensure cross-platform compatibility
  const filePath = path.join(__dirname, '../data/registerUser.json');
  
  fs.writeFileSync(filePath, jsonString, 'utf-8');
  };

}