$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot

if (-not (Get-Command xelatex -ErrorAction SilentlyContinue)) {
  throw "xelatex is not installed or not on PATH."
}

if (-not (Test-Path out)) {
  New-Item -ItemType Directory -Path out | Out-Null
}

xelatex -interaction=nonstopmode -halt-on-error -output-directory=out cv.tex | Out-Host
xelatex -interaction=nonstopmode -halt-on-error -output-directory=out cv.tex | Out-Host
