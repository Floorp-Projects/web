#!/bin/sh
# Floorp Browser Installer Script
# Detects OS and installs Floorp Browser accordingly

set -eu

main() {
    OS=""
    PACKAGE_TYPE=""

    if [ -f /etc/os-release ]; then
        . /etc/os-release
        case "$ID" in
            ubuntu|debian)
                OS="ubuntu"
                PACKAGE_TYPE="apt"
                ;;
            arch|manjaro|endeavouros)
                OS="arch"
                PACKAGE_TYPE="pacman"
                ;;
            *)
                echo "Unsupported OS: $ID"
                exit 1
                ;;
        esac
    else
        echo "/etc/os-release not found. Cannot detect OS."
        exit 1
    fi

    CAN_ROOT=""
    SUDO=""
    if [ "$(id -u)" = 0 ]; then
        CAN_ROOT=1
        SUDO=""
    elif type sudo >/dev/null 2>&1; then
        CAN_ROOT=1
        SUDO="sudo"
    else
        echo "This installer requires root privileges. Install sudo or run as root."
        exit 1
    fi

    case "$PACKAGE_TYPE" in
        apt)
            echo "Installing Floorp on Ubuntu/Debian..."
            $SUDO curl -fsSL https://ppa.floorp.app/KEY.gpg | $SUDO gpg --dearmor -o /usr/share/keyrings/Floorp.gpg
            $SUDO curl -sS --compressed -o /etc/apt/sources.list.d/Floorp.list "https://ppa.floorp.app/Floorp.list"
            $SUDO apt update
            $SUDO apt install -y floorp
            ;;
        pacman)
            echo "Installing Floorp on Arch-based systems via AUR..."
            if ! command -v git >/dev/null 2>&1; then
                $SUDO pacman -S --noconfirm git base-devel
            fi
            git clone https://aur.archlinux.org/floorp-bin.git
            cd floorp-bin
            makepkg -si --noconfirm
            cd ..
            rm -rf floorp-bin
            ;;
        *)
            echo "Unsupported package manager."
            exit 1
            ;;
    esac

    echo "Installation complete! You can now run Floorp."
}

main
