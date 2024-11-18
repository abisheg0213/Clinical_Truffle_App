# Check if the script is running as administrator
$CurrentUser = [Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()
$IsAdmin = $CurrentUser.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $IsAdmin) {
    # Relaunch the script as administrator
    $Args = "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`" $args"
    Start-Process powershell -ArgumentList $Args -Verb RunAs
    exit
}

# Install NodeJs
$nodeUrl = "https://nodejs.org/dist/v20.18.0/node-v20.18.0-x64.msi"
$nodeMsiPath = "$env:TEMP\node-v20.18.0-x64.msi"
Invoke-WebRequest -Uri $nodeUrl -OutFile $nodeMsiPath
Start-Process -Wait -FilePath msiexec.exe -ArgumentList "/i", $nodeMsiPath, "/norestart"

# Install other Required Extensions  
npm i -g ganache-cli
npm i -g truffle