Add-Type -AssemblyName System.IO.Compression.FileSystem

$sourceDir = (Resolve-Path "client\dist").Path
$zipFile = Join-Path (Get-Location) "public_html_interiordesignerinlahore.zip"

Write-Host "Creating zip from $sourceDir to $zipFile ..."
if (Test-Path $zipFile) {
    Remove-Item $zipFile -Force
}

[System.IO.Compression.ZipFile]::CreateFromDirectory($sourceDir, $zipFile, [System.IO.Compression.CompressionLevel]::Optimal, $false)

$sizeMB = [math]::Round((Get-Item $zipFile).Length / 1MB, 2)
Write-Host "SUCCESS: Created $zipFile ($sizeMB MB)"
