# Check if the script is running as administrator
$CurrentUser = [Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()
$IsAdmin = $CurrentUser.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $IsAdmin) {
    # Relaunch the script as administrator
    $Args = "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`" $args"
    Start-Process powershell -ArgumentList $Args -Verb RunAs
    exit
}

# Install Node.js
Read-Host -Prompt "get cal"
$nodeUrl = "https://nodejs.org/dist/v20.18.0/node-v20.18.0-x64.msi"
$nodeMsiPath = "$env:TEMP\node-v20.18.0-x64.msi"
Invoke-WebRequest -Uri $nodeUrl -OutFile $nodeMsiPath

# Install Node.js from the downloaded MSI
Start-Process -Wait -FilePath msiexec.exe -ArgumentList "/i", $nodeMsiPath, "/norestart"

# Clean up the temporary MSI file after installation
Remove-Item -Path $nodeMsiPath -Force

# Install other required Node.js packages globally
npm i -g ganache-cli
npm i -g truffle

Write-Host "Node.js, Ganache CLI, and Truffle have been installed successfully."
