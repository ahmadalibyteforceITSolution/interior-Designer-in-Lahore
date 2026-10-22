Add-Type -AssemblyName System.IO.Compression.FileSystem

$destZip = Join-Path (Get-Location) "fullstack_cpanel_interiordesignerinlahore.zip"
$tempFolder = Join-Path (Get-Location) "cpanel_deploy_temp"

Write-Host "Preparing full-stack cPanel deployment bundle..."
if (Test-Path $destZip) { Remove-Item $destZip -Force }
if (Test-Path $tempFolder) { Remove-Item $tempFolder -Recurse -Force }

New-Item -ItemType Directory -Path $tempFolder | Out-Null

# 1. Copy root files
Copy-Item "app.js" -Destination $tempFolder
Copy-Item "package.json" -Destination $tempFolder
Copy-Item "package-lock.json" -Destination $tempFolder -ErrorAction SilentlyContinue
Copy-Item ".env" -Destination $tempFolder -ErrorAction SilentlyContinue

# 2. Copy server folder (excluding node_modules)
$serverDest = Join-Path $tempFolder "server"
New-Item -ItemType Directory -Path $serverDest | Out-Null
Get-ChildItem -Path "server" -Exclude "node_modules" | Copy-Item -Destination $serverDest -Recurse

# 3. Copy client/dist folder
$clientDest = Join-Path $tempFolder "client"
New-Item -ItemType Directory -Path $clientDest | Out-Null
Copy-Item "client\dist" -Destination $clientDest -Recurse

# 4. Copy api folder
if (Test-Path "api") {
    Copy-Item "api" -Destination $tempFolder -Recurse
}

# 5. Compress into zip
Write-Host "Compressing to $destZip ..."
[System.IO.Compression.ZipFile]::CreateFromDirectory($tempFolder, $destZip, [System.IO.Compression.CompressionLevel]::Optimal, $false)

# Clean up temporary folder
Remove-Item $tempFolder -Recurse -Force

$sizeMB = [math]::Round((Get-Item $destZip).Length / 1MB, 2)
Write-Host "SUCCESS: Created $destZip ($sizeMB MB)"
