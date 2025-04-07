import os
import subprocess
import sys
from pathlib import Path
from dotenv import load_dotenv
import requests

load_dotenv()

POS_VERSION = os.getenv("POS_VERSION")
KIOSK_VERSION = os.getenv("KIOSK_VERSION")

if not POS_VERSION or not KIOSK_VERSION:
    print("❌ POS_VERSION ou KIOSK_VERSION não definidas no .env")
    sys.exit(1)

BASE_DIR = Path(__file__).resolve().parent
BIN_DIR = BASE_DIR / "bin"
INSTALL_DIR = BASE_DIR / "installed"
POS_INSTALL_DIR = INSTALL_DIR / "pos"
KIOSK_INSTALL_DIR = INSTALL_DIR / "kiosk"

BIN_DIR.mkdir(parents=True, exist_ok=True)
POS_INSTALL_DIR.mkdir(parents=True, exist_ok=True)
KIOSK_INSTALL_DIR.mkdir(parents=True, exist_ok=True)


def download_public_build(app: str, version: str):
    filename = f"foodinn-{app}_{version}.exe"
    url = f"https://foodinn-share-built-versions.s3.eu-west-1.amazonaws.com/{filename}"
    dest = BIN_DIR / filename

    print(url)

    if dest.exists():
        print(f"✅ {filename} já existe. Pulando download.")
        return dest

    print(f"⬇️  Baixando {filename}...")
    response = requests.get(url, stream=True)
    if response.status_code == 200:
        with open(dest, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"✅ Download de {filename} concluído.")
        return dest
    else:
        print(f"❌ Falha ao baixar {filename}: HTTP {response.status_code}")
        sys.exit(1)


def install_silent(installer_path: Path, install_dir: Path):
    exe_name = installer_path.stem.replace("foodinn-", "")
    target_exe = install_dir / f"{exe_name}.exe"
    if target_exe.exists():
        print(f"✅ {target_exe.name} já instalado.")
        return target_exe

    print(f"🔧 Instalando {exe_name} silenciosamente em {install_dir}...")
    try:
        subprocess.run([
            str(installer_path), "/S", f"/D={str(install_dir)}"
        ], check=True)
        print(f"✅ {exe_name} instalado com sucesso.")
    except subprocess.CalledProcessError as e:
        print(f"❌ Erro ao instalar {exe_name}: {e}")
        sys.exit(1)

    return target_exe


# Executa preparação do ambiente do Guardian
pos_installer = download_public_build("pos", POS_VERSION)
# kiosk_installer = download_public_build("kiosk", KIOSK_VERSION)

install_silent(pos_installer, POS_INSTALL_DIR)
# install_silent(kiosk_installer, KIOSK_INSTALL_DIR)

# Instalar dependências
requirements = BASE_DIR / "requirements.txt"
if requirements.exists():
    print("📦 Instalando dependências do requirements.txt")
    subprocess.run([sys.executable, "-m", "pip", "install", "-r", str(requirements)], check=True)
else:
    print("⚠️  Nenhum requirements.txt encontrado.")

print("✅ Ambiente do Guardian preparado com sucesso. Pronto para testes!")