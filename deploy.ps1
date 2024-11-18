truffle compile
Read-Host -Prompt "Compilied SuccessFully!! Press any key to Deploy it ..."

$ganacheProcess = Start-Process -NoNewWindow -FilePath "powershell.exe" -ArgumentList "ganache-cli -a 15" 

Write-Host "waiting To start the Ganache Server at Port 8545"
Start-Sleep -Seconds 5

Write-Host "Deploying..."

truffle deploy 
Read-Host -Prompt "!! Press any key to exit... !!"

if (!$ganacheProcess.HasExited) {
    $ganacheProcess.CloseMainWindow()
    $ganacheProcess.WaitForExit(10) 
    if (!$ganacheProcess.HasExited) {
        $ganacheProcess.Kill() 
    }
}

Write-Host "Ganache process exited with code: $($ganacheProcess.ExitCode)"
