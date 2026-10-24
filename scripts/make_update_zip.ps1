$srcDir = "C:\Users\Spacs & Places 3\Desktop\Space and place"
$zipPath = "C:\Users\Spacs & Places 3\Desktop\interiordesignerinlahore_update.zip"
$stageDir = "C:\Users\Spacs & Places 3\Desktop\temp_cpanel_stage"

if (Test-Path $stageDir) {
    Remove-Item -Recurse -Force $stageDir
}
New-Item -ItemType Directory -Path $stageDir | Out-Null
New-Item -ItemType Directory -Path "$stageDir\client" | Out-Null

Copy-Item -Recurse -Path "$srcDir\server" -Destination "$stageDir\server"
Copy-Item -Recurse -Path "$srcDir\client\dist" -Destination "$stageDir\client\dist"
Copy-Item -Path "$srcDir\app.js" -Destination "$stageDir\app.js"
Copy-Item -Path "$srcDir\package.json" -Destination "$stageDir\package.json"
Copy-Item -Path "$srcDir\.env" -Destination "$stageDir\.env"

if (Test-Path $zipPath) {
    Remove-Item -Force $zipPath
}

Add-Type -AssemblyName "System.IO.Compression.FileSystem"
[System.IO.Compression.ZipFile]::CreateFromDirectory($stageDir, $zipPath)

$file = Get-Item $zipPath
$size = [math]::Round($file.Length / 1MB, 2)
Write-Output "SUCCESS: Created $zipPath ($size MB)"

Remove-Item -Recurse -Force $stageDir
