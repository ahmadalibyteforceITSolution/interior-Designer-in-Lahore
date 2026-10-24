$src = "C:\Users\Spacs & Places 3\Desktop\Space and place"
$quickZip = "C:\Users\Spacs & Places 3\Desktop\interiordesignerinlahore_quick_update.zip"
$stage = "C:\Users\Spacs & Places 3\Desktop\temp_quick"

if (Test-Path $stage) { Remove-Item -Recurse -Force $stage }
New-Item -ItemType Directory -Path $stage | Out-Null
New-Item -ItemType Directory -Path "$stage\server" | Out-Null
New-Item -ItemType Directory -Path "$stage\client" | Out-Null

Get-ChildItem -Path "$src\server" -Exclude "uploads" | Copy-Item -Destination "$stage\server" -Recurse
Copy-Item -Recurse -Path "$src\client\dist" -Destination "$stage\client\dist"
Copy-Item -Path "$src\app.js" -Destination "$stage\app.js"
Copy-Item -Path "$src\package.json" -Destination "$stage\package.json"
Copy-Item -Path "$src\.env" -Destination "$stage\.env"

Add-Type -AssemblyName "System.IO.Compression.FileSystem"
if (Test-Path $quickZip) { Remove-Item -Force $quickZip }
[System.IO.Compression.ZipFile]::CreateFromDirectory($stage, $quickZip)

$sz = [math]::Round((Get-Item $quickZip).Length / 1MB, 2)
Write-Output "SUCCESS: Created $quickZip ($sz MB)"

Remove-Item -Recurse -Force $stage
