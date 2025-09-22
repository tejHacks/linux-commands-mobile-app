import { useState } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Navbar from '../components/Navbar';

// linux commands are stored in an array of Objects
const LINUX_COMMANDS = [
  // System Information (25)
  { name: 'arch', description: 'Print machine architecture', example: 'arch' },
  { name: 'uname -a', description: 'Display all system info', example: 'uname -a' },
  { name: 'uname -m', description: 'Show machine hardware name', example: 'uname -m' },
  { name: 'uname -r', description: 'Display kernel release', example: 'uname -r' },
  { name: 'uname -s', description: 'Show kernel name', example: 'uname -s' },
  { name: 'cat /proc/cpuinfo', description: 'Display CPU info', example: 'cat /proc/cpuinfo' },
  { name: 'cat /proc/meminfo', description: 'Show memory usage', example: 'cat /proc/meminfo' },
  { name: 'cat /proc/swaps', description: 'List swap space', example: 'cat /proc/swaps' },
  { name: 'lscpu', description: 'Display CPU architecture info', example: 'lscpu' },
  { name: 'free -h', description: 'Show free and used memory', example: 'free -h' },
  { name: 'df -h', description: 'Display disk space usage', example: 'df -h' },
  { name: 'du -sh', description: 'Estimate file space usage', example: 'du -sh .' },
  { name: 'lsblk', description: 'List block devices', example: 'lsblk' },
  { name: 'dmesg', description: 'Print kernel messages', example: 'dmesg' },
  { name: 'lspci', description: 'List PCI devices', example: 'lspci' },
  { name: 'lsusb', description: 'List USB devices', example: 'lsusb' },
  { name: 'hostname', description: 'Show system hostname', example: 'hostname' },
  { name: 'whoami', description: 'Display current user', example: 'whoami' },
  { name: 'id', description: 'Print user and group info', example: 'id' },
  { name: 'last', description: 'Show last logged-in users', example: 'last' },
  { name: 'uptime', description: 'Show system uptime', example: 'uptime' },
  { name: 'w', description: 'Show who is logged on', example: 'w' },
  { name: 'vmstat', description: 'Report virtual memory stats', example: 'vmstat' },
  { name: 'top', description: 'Display running processes', example: 'top' },
  { name: 'htop', description: 'Interactive process viewer', example: 'htop' },

  // File and Directory Management (40)
  { name: 'cd', description: 'Change directory', example: 'cd /home' },
  { name: 'pwd', description: 'Print working directory', example: 'pwd' },
  { name: 'ls', description: 'List directory contents', example: 'ls -l' },
  { name: 'ls -a', description: 'List all files', example: 'ls -a' },
  { name: 'mkdir', description: 'Create directory', example: 'mkdir newdir' },
  { name: 'rmdir', description: 'Remove empty directory', example: 'rmdir olddir' },
  { name: 'rm', description: 'Remove files or directories', example: 'rm -rf dir' },
  { name: 'cp', description: 'Copy files or directories', example: 'cp file1 file2' },
  { name: 'mv', description: 'Move or rename files', example: 'mv file1 /tmp/' },
  { name: 'ln -s', description: 'Create symbolic link', example: 'ln -s file1 link1' },
  { name: 'touch', description: 'Create empty file', example: 'touch file1' },
  { name: 'find', description: 'Search for files', example: 'find / -name "*.txt"' },
  { name: 'locate', description: 'Find files by name', example: 'locate document.pdf' },
  { name: 'chmod', description: 'Change file permissions', example: 'chmod 755 script.sh' },
  { name: 'chown', description: 'Change file owner', example: 'chown user1 file1' },
  { name: 'chgrp', description: 'Change file group', example: 'chgrp group1 file1' },
  { name: 'cat', description: 'Concatenate and display files', example: 'cat file1' },
  { name: 'less', description: 'View file content page by page', example: 'less file1' },
  { name: 'more', description: 'Display file content in pages', example: 'more file1' },
  { name: 'head', description: 'Show first lines of a file', example: 'head -n 10 file1' },
  { name: 'tail', description: 'Show last lines of a file', example: 'tail -n 10 file1' },
  { name: 'wc', description: 'Word, line, character count', example: 'wc file1' },
  { name: 'cut', description: 'Cut sections from each line', example: 'cut -d: -f1 file1' },
  { name: 'paste', description: 'Merge lines of files', example: 'paste file1 file2' },
  { name: 'sort', description: 'Sort lines of text', example: 'sort file1' },
  { name: 'uniq', description: 'Remove duplicate lines', example: 'uniq file1' },
  { name: 'diff', description: 'Compare files line by line', example: 'diff file1 file2' },
  { name: 'cmp', description: 'Compare files byte by byte', example: 'cmp file1 file2' },
  { name: 'file', description: 'Determine file type', example: 'file file1' },
  { name: 'stat', description: 'Display file status', example: 'stat file1' },
  { name: 'tree', description: 'Display directory tree', example: 'tree /home' },
  { name: 'ln', description: 'Create hard link', example: 'ln file1 link1' },
  { name: 'cp -r', description: 'Copy directories recursively', example: 'cp -r dir1 dir2' },
  { name: 'mv -f', description: 'Force move files', example: 'mv -f file1 /tmp/' },
  { name: 'rm -f', description: 'Force remove files', example: 'rm -f file1' },
  { name: 'mkdir -p', description: 'Create nested directories', example: 'mkdir -p dir1/dir2' },
  { name: 'ls -lh', description: 'List with human-readable sizes', example: 'ls -lh' },
  { name: 'du -h', description: 'Show directory sizes human-readable', example: 'du -h' },
  { name: 'df', description: 'Report filesystem disk space', example: 'df -h' },
  { name: 'mount', description: 'Mount a filesystem', example: 'mount /dev/sda1 /mnt' },

  // Process Management (20)
  { name: 'ps', description: 'List running processes', example: 'ps aux' },
  { name: 'top', description: 'Monitor processes interactively', example: 'top' },
  { name: 'htop', description: 'Enhanced process viewer', example: 'htop' },
  { name: 'kill', description: 'Terminate a process by PID', example: 'kill 1234' },
  { name: 'killall', description: 'Kill processes by name', example: 'killall firefox' },
  { name: 'pkill', description: 'Kill by process name pattern', example: 'pkill -9 chrome' },
  { name: 'bg', description: 'Send process to background', example: 'bg %1' },
  { name: 'fg', description: 'Bring process to foreground', example: 'fg %1' },
  { name: 'jobs', description: 'List background jobs', example: 'jobs' },
  { name: 'nice', description: 'Run with modified scheduling priority', example: 'nice -n 10 command' },
  { name: 'renice', description: 'Alter priority of running process', example: 'renice 10 1234' },
  { name: 'nohup', description: 'Run command immune to hangups', example: 'nohup command &' },
  { name: 'pgrep', description: 'Find processes by name', example: 'pgrep ssh' },
  { name: 'pstree', description: 'Display process tree', example: 'pstree' },
  { name: 'pmap', description: 'Memory map of processes', example: 'pmap 1234' },
  { name: 'strace', description: 'Trace system calls', example: 'strace -p 1234' },
  { name: 'lsof', description: 'List open files', example: 'lsof -i' },
  { name: 'fuser', description: 'Identify processes using files', example: 'fuser /dev/sda1' },
  { name: 'watch', description: 'Run command repeatedly', example: 'watch -n 2 df' },
  { name: 'time', description: 'Measure execution time', example: 'time ls' },

  // Networking (25)
  { name: 'ping', description: 'Check host connectivity', example: 'ping google.com' },
  { name: 'ifconfig', description: 'Configure network interfaces', example: 'ifconfig' },
  { name: 'ip', description: 'Show/manipulate routing info', example: 'ip addr' },
  { name: 'netstat', description: 'Network statistics', example: 'netstat -tuln' },
  { name: 'ss', description: 'Socket statistics', example: 'ss -t -a' },
  { name: 'curl', description: 'Transfer data from URL', example: 'curl -O http://example.com/file' },
  { name: 'wget', description: 'Download files from web', example: 'wget http://example.com/file' },
  { name: 'ssh', description: 'Secure shell to remote host', example: 'ssh user@host' },
  { name: 'scp', description: 'Secure copy between hosts', example: 'scp file user@host:/path' },
  { name: 'rsync', description: 'Remote file synchronization', example: 'rsync -avz file user@host:/path' },
  { name: 'traceroute', description: 'Trace route to host', example: 'traceroute google.com' },
  { name: 'nslookup', description: 'Query DNS info', example: 'nslookup google.com' },
  { name: 'dig', description: 'DNS lookup utility', example: 'dig google.com' },
  { name: 'host', description: 'DNS lookup', example: 'host google.com' },
  { name: 'arp', description: 'Manipulate ARP cache', example: 'arp -n' },
  { name: 'route', description: 'Show routing table', example: 'route -n' },
  { name: 'iptables', description: 'Administer firewall rules', example: 'iptables -L' },
  { name: 'tcpdump', description: 'Dump traffic on network', example: 'tcpdump -i eth0' },
  { name: 'nc', description: 'Netcat for network testing', example: 'nc -l 1234' },
  { name: 'telnet', description: 'Telnet to host', example: 'telnet host 23' },
  { name: 'ftp', description: 'File transfer protocol', example: 'ftp ftp.example.com' },
  { name: 'sftp', description: 'Secure file transfer', example: 'sftp user@host' },
  { name: 'nmap', description: 'Network scanner', example: 'nmap -sV host' },
  { name: 'iwconfig', description: 'Configure wireless interfaces', example: 'iwconfig' },
  { name: 'dhclient', description: 'Request DHCP lease', example: 'dhclient eth0' },

  // Compression and Archiving (15)
  { name: 'tar -cvf', description: 'Create tar archive', example: 'tar -cvf archive.tar dir' },
  { name: 'tar -xvf', description: 'Extract tar archive', example: 'tar -xvf archive.tar' },
  { name: 'tar -czvf', description: 'Create compressed tar', example: 'tar -czvf archive.tar.gz dir' },
  { name: 'tar -xzvf', description: 'Extract compressed tar', example: 'tar -xzvf archive.tar.gz' },
  { name: 'gzip', description: 'Compress file', example: 'gzip file1' },
  { name: 'gunzip', description: 'Decompress file', example: 'gunzip file1.gz' },
  { name: 'zip', description: 'Create zip archive', example: 'zip archive.zip file1' },
  { name: 'unzip', description: 'Extract zip archive', example: 'unzip archive.zip' },
  { name: 'bzip2', description: 'Compress with bzip2', example: 'bzip2 file1' },
  { name: 'bunzip2', description: 'Decompress bzip2', example: 'bunzip2 file1.bz2' },
  { name: 'xz', description: 'Compress with xz', example: 'xz file1' },
  { name: 'unxz', description: 'Decompress xz', example: 'unxz file1.xz' },
  { name: 'zcat', description: 'Cat compressed file', example: 'zcat file1.gz' },
  { name: 'rar', description: 'Create rar archive', example: 'rar a archive.rar dir' },
  { name: 'unrar', description: 'Extract rar archive', example: 'unrar x archive.rar' },

  // System Control (20)
  { name: 'shutdown', description: 'Shutdown or reboot', example: 'shutdown -h now' },
  { name: 'reboot', description: 'Reboot system', example: 'reboot' },
  { name: 'halt', description: 'Stop system', example: 'halt' },
  { name: 'poweroff', description: 'Power off system', example: 'poweroff' },
  { name: 'init', description: 'Change runlevel', example: 'init 0' },
  { name: 'systemctl', description: 'Control systemd services', example: 'systemctl start nginx' },
  { name: 'service', description: 'Start/stop services', example: 'service apache2 start' },
  { name: 'crontab', description: 'Edit crontab schedule', example: 'crontab -e' },
  { name: 'at', description: 'Schedule one-time task', example: 'at 14:00' },
  { name: 'journalctl', description: 'Query systemd logs', example: 'journalctl -u nginx' },
  { name: 'logrotate', description: 'Rotate log files', example: 'logrotate /etc/logrotate.conf' },
  { name: 'sync', description: 'Flush filesystem buffers', example: 'sync' },
  { name: 'fsck', description: 'Check and repair filesystem', example: 'fsck /dev/sda1' },
  { name: 'mkfs', description: 'Create filesystem', example: 'mkfs.ext4 /dev/sdb1' },
  { name: 'e2fsck', description: 'Check ext2/ext3/ext4 filesystem', example: 'e2fsck /dev/sda1' },
  { name: 'swapoff', description: 'Disable swap space', example: 'swapoff -a' },
  { name: 'swapon', description: 'Enable swap space', example: 'swapon -a' },
  { name: 'fdisk', description: 'Manipulate disk partitions', example: 'fdisk /dev/sda' },
  { name: 'parted', description: 'Disk partitioning tool', example: 'parted /dev/sda' },
  { name: 'blkid', description: 'Locate block device attributes', example: 'blkid' },

  // Text Processing (25)
  { name: 'grep', description: 'Search text using patterns', example: 'grep "error" file1' },
  { name: 'sed', description: 'Stream editor for text', example: 'sed s/old/new/g file1' },
  { name: 'awk', description: 'Pattern scanning and processing', example: 'awk \'{print $1}\' file1' },
  { name: 'cut', description: 'Cut sections from lines', example: 'cut -d: -f1 file1' },
  { name: 'paste', description: 'Merge lines of files', example: 'paste file1 file2' },
  { name: 'tr', description: 'Translate or delete characters', example: 'tr a-z A-Z' },
  { name: 'rev', description: 'Reverse lines or characters', example: 'rev file1' },
  { name: 'expand', description: 'Convert tabs to spaces', example: 'expand -t 4 file1' },
  { name: 'fmt', description: 'Reformat paragraph text', example: 'fmt file1' },
  { name: 'fold', description: 'Wrap lines at a width', example: 'fold -w 40 file1' },
  { name: 'nl', description: 'Number lines', example: 'nl file1' },
  { name: 'pr', description: 'Prepare files for printing', example: 'pr file1' },
  { name: 'tee', description: 'Redirect output to files', example: 'echo test | tee file1' },
  { name: 'od', description: 'Dump files in octal/hex', example: 'od -x file1' },
  { name: 'strings', description: 'Print printable strings', example: 'strings file1' },
  { name: 'col', description: 'Filter reverse line feeds', example: 'col file1' },
  { name: 'join', description: 'Join lines of two files', example: 'join file1 file2' },
  { name: 'split', description: 'Split file into pieces', example: 'split -l 1000 file1' },
  { name: 'csplit', description: 'Split by context', example: 'csplit file1 /pattern/' },
  { name: 'unexpand', description: 'Convert spaces to tabs', example: 'unexpand -t 4 file1' },
  { name: 'wc -l', description: 'Count lines', example: 'wc -l file1' },
  { name: 'sort -n', description: 'Numeric sort', example: 'sort -n file1' },
  { name: 'uniq -c', description: 'Count unique lines', example: 'uniq -c file1' },
  { name: 'comm', description: 'Compare sorted files', example: 'comm file1 file2' },
  { name: 'diff -u', description: 'Unified diff', example: 'diff -u file1 file2' },

  // User and Group Management (15)
  { name: 'who', description: 'Show who is logged on', example: 'who' },
  { name: 'users', description: 'List current users', example: 'users' },
  { name: 'finger', description: 'Display user info', example: 'finger user1' },
  { name: 'wall', description: 'Send message to all users', example: 'wall "Hello"' },
  { name: 'write', description: 'Send message to user', example: 'write user1' },
  { name: 'mesg', description: 'Control write access', example: 'mesg y' },
  { name: 'chsh', description: 'Change login shell', example: 'chsh -s /bin/bash' },
  { name: 'passwd', description: 'Change user password', example: 'passwd' },
  { name: 'su', description: 'Switch user', example: 'su - user1' },
  { name: 'sudo', description: 'Run command as superuser', example: 'sudo apt update' },
  { name: 'useradd', description: 'Add new user', example: 'useradd newuser' },
  { name: 'usermod', description: 'Modify user account', example: 'usermod -aG group user' },
  { name: 'userdel', description: 'Delete user', example: 'userdel olduser' },
  { name: 'groupadd', description: 'Add new group', example: 'groupadd newgroup' },
  { name: 'groupdel', description: 'Delete group', example: 'groupdel oldgroup' },

  // Package Management (15)
  { name: 'apt update', description: 'Update package lists', example: 'apt update' },
  { name: 'apt install', description: 'Install package', example: 'apt install vim' },
  { name: 'apt remove', description: 'Remove package', example: 'apt remove vim' },
  { name: 'apt search', description: 'Search packages', example: 'apt search editor' },
  { name: 'apt list', description: 'List installed packages', example: 'apt list --installed' },
  { name: 'yum install', description: 'Install with YUM', example: 'yum install firefox' },
  { name: 'yum update', description: 'Update packages', example: 'yum update' },
  { name: 'yum remove', description: 'Remove package', example: 'yum remove firefox' },
  { name: 'dpkg -i', description: 'Install DEB package', example: 'dpkg -i package.deb' },
  { name: 'rpm -ivh', description: 'Install RPM package', example: 'rpm -ivh package.rpm' },
  { name: 'rpm -qa', description: 'List installed RPMs', example: 'rpm -qa' },
  { name: 'dnf install', description: 'Install with DNF', example: 'dnf install git' },
  { name: 'dnf update', description: 'Update with DNF', example: 'dnf update' },
  { name: 'zypper install', description: 'Install with Zypper', example: 'zypper install nano' },
  { name: 'pacman -S', description: 'Install with Pacman', example: 'pacman -S htop' },

  // Miscellaneous Utilities (35)
  { name: 'man', description: 'Display manual for command', example: 'man ls' },
  { name: 'whatis', description: 'Show one-line manual description', example: 'whatis ls' },
  { name: 'apropos', description: 'Search manual pages', example: 'apropos file' },
  { name: 'echo', description: 'Print text', example: 'echo "Hello World"' },
  { name: 'date', description: 'Show or set date/time', example: 'date' },
  { name: 'cal', description: 'Display calendar', example: 'cal' },
  { name: 'bc', description: 'Arbitrary precision calculator', example: 'bc' },
  { name: 'clear', description: 'Clear terminal screen', example: 'clear' },
  { name: 'history', description: 'Show command history', example: 'history' },
  { name: 'alias', description: 'Create command alias', example: 'alias ll="ls -l"' },
  { name: 'unalias', description: 'Remove alias', example: 'unalias ll' },
  { name: 'env', description: 'Display environment variables', example: 'env' },
  { name: 'export', description: 'Set environment variable', example: 'export PATH=$PATH:/new' },
  { name: 'set', description: 'Set or unset shell options', example: 'set -x' },
  { name: 'unset', description: 'Unset variable', example: 'unset VAR' },
  { name: 'which', description: 'Locate executable', example: 'which ls' },
  { name: 'whereis', description: 'Locate binary/source/man', example: 'whereis ls' },
  { name: 'type', description: 'Show command type', example: 'type ls' },
  { name: 'exit', description: 'Exit shell', example: 'exit' },
  { name: 'source', description: 'Execute script in current shell', example: 'source script.sh' },
  { name: '.', description: 'Execute commands from file', example: '. script.sh' },
  { name: 'xargs', description: 'Build and execute command lines', example: 'echo file1 | xargs rm' },
  { name: 'yes', description: 'Output string repeatedly', example: 'yes y | command' },
  { name: 'seq', description: 'Print numeric sequence', example: 'seq 1 10' },
  { name: 'sleep', description: 'Delay execution', example: 'sleep 5' },
  { name: 'wait', description: 'Wait for background jobs', example: 'wait' },
  { name: 'test', description: 'Check file conditions', example: 'test -f file1' },
  { name: '[ ]', description: 'Test expression', example: '[ -f file1 ]' },
  { name: '&&', description: 'Logical AND', example: 'command1 && command2' },
  { name: '||', description: 'Logical OR', example: 'command1 || command2' },
  { name: ';', description: 'Command separator', example: 'command1; command2' },
  { name: '&', description: 'Background execution', example: 'command &' },
  { name: 'ctrl + c', description: 'Interrupt process', example: 'Ctrl+C' },
  { name: 'ctrl + d', description: 'End input/EOF', example: 'Ctrl+D' },
  { name: 'ctrl + z', description: 'Suspend process', example: 'Ctrl+Z' },
  { name: 'jobs -l', description: 'List jobs with PIDs', example: 'jobs -l' },
  // System Information (10 new)
  { name: 'lscpu -e', description: 'Display CPU info in table format', example: 'lscpu -e' },
  { name: 'dmidecode', description: 'Show hardware info from BIOS', example: 'dmidecode -t memory' },
  { name: 'lsmod', description: 'List loaded kernel modules', example: 'lsmod' },
  { name: 'uname -v', description: 'Show kernel version', example: 'uname -v' },
  { name: 'cat /etc/os-release', description: 'Display OS information', example: 'cat /etc/os-release' },
  { name: 'lsb_release -a', description: 'Show LSB and distribution info', example: 'lsb_release -a' },
  { name: 'iostat', description: 'Report CPU and I/O statistics', example: 'iostat' },
  { name: 'sar', description: 'Collect system activity info', example: 'sar -u 1 3' },
  { name: 'free -m', description: 'Show memory in MB', example: 'free -m' },
  { name: 'vmstat -s', description: 'Display memory statistics', example: 'vmstat -s' },

  // File and Directory Management (15 new)
  { name: 'find -type d', description: 'Search for directories only', example: 'find / -type d -name "logs"' },
  { name: 'find -type f', description: 'Search for files only', example: 'find / -type f -name "*.log"' },
  { name: 'ls -R', description: 'List directories recursively', example: 'ls -R' },
  { name: 'touch -t', description: 'Set file timestamp', example: 'touch -t 202509221230 file1' },
  { name: 'chmod -R', description: 'Change permissions recursively', example: 'chmod -R 755 dir' },
  { name: 'chown -R', description: 'Change owner recursively', example: 'chown -R user1 dir' },
  { name: 'cat -n', description: 'Number lines in file', example: 'cat -n file1' },
  { name: 'tail -f', description: 'Follow file updates', example: 'tail -f log.txt' },
  { name: 'cp -p', description: 'Preserve file attributes', example: 'cp -p file1 file2' },
  { name: 'mv -i', description: 'Prompt before overwrite', example: 'mv -i file1 /tmp/' },
  { name: 'rm -i', description: 'Prompt before removal', example: 'rm -i file1' },
  { name: 'du -c', description: 'Show total size', example: 'du -c dir' },
  { name: 'ls -i', description: 'Show inode numbers', example: 'ls -i' },
  { name: 'file -i', description: 'Show MIME type', example: 'file -i file1' },
  { name: 'tree -d', description: 'Show directories only', example: 'tree -d' },

  // Process Management (10 new)
  { name: 'ps -ef', description: 'Show all processes in full format', example: 'ps -ef' },
  { name: 'kill -9', description: 'Force kill a process', example: 'kill -9 1234' },
  { name: 'pkill -u', description: 'Kill processes by user', example: 'pkill -u user1' },
  { name: 'top -u', description: 'Show processes by user', example: 'top -u user1' },
  { name: 'htop -u', description: 'Filter processes by user in htop', example: 'htop -u user1' },
  { name: 'nice -n -10', description: 'Run with high priority', example: 'nice -n -10 command' },
  { name: 'ionice', description: 'Set I/O scheduling priority', example: 'ionice -c3 command' },
  { name: 'pidstat', description: 'Monitor process statistics', example: 'pidstat 1' },
  { name: 'lsof -p', description: 'List files opened by PID', example: 'lsof -p 1234' },
  { name: 'killall -9', description: 'Force kill by name', example: 'killall -9 firefox' },

  // Networking (15 new)
  { name: 'ip link', description: 'Show network interfaces', example: 'ip link' },
  { name: 'ip route', description: 'Show routing table', example: 'ip route' },
  { name: 'netstat -i', description: 'Show network interfaces', example: 'netstat -i' },
  { name: 'ss -l', description: 'List listening sockets', example: 'ss -l' },
  { name: 'curl -I', description: 'Fetch HTTP headers', example: 'curl -I http://example.com' },
  { name: 'wget -r', description: 'Download recursively', example: 'wget -r http://example.com' },
  { name: 'ssh -p', description: 'SSH to specific port', example: 'ssh -p 2222 user@host' },
  { name: 'scp -r', description: 'Copy directories securely', example: 'scp -r dir user@host:/path' },
  { name: 'rsync -P', description: 'Show progress during sync', example: 'rsync -P file user@host:/path' },
  { name: 'nmap -p', description: 'Scan specific ports', example: 'nmap -p 80,443 host' },
  { name: 'tcpdump -c', description: 'Capture specific packet count', example: 'tcpdump -c 10' },
  { name: 'ifup', description: 'Bring interface up', example: 'ifup eth0' },
  { name: 'ifdown', description: 'Bring interface down', example: 'ifdown eth0' },
  { name: 'ethtool', description: 'Display ethernet status', example: 'ethtool eth0' },
  { name: 'ip addr add', description: 'Add IP to interface', example: 'ip addr add 192.168.1.2/24 dev eth0' },

  // Compression and Archiving (5 new)
  { name: 'tar -tvf', description: 'List tar archive contents', example: 'tar -tvf archive.tar' },
  { name: 'zip -r', description: 'Create recursive zip', example: 'zip -r archive.zip dir' },
  { name: 'gzip -d', description: 'Decompress gzip file', example: 'gzip -d file1.gz' },
  { name: 'tar -cjvf', description: 'Create bzip2 tar archive', example: 'tar -cjvf archive.tar.bz2 dir' },
  { name: 'tar -xjvf', description: 'Extract bzip2 tar archive', example: 'tar -xjvf archive.tar.bz2' },

  // System Control (10 new)
  { name: 'systemctl status', description: 'Show service status', example: 'systemctl status nginx' },
  { name: 'systemctl enable', description: 'Enable service at boot', example: 'systemctl enable nginx' },
  { name: 'systemctl disable', description: 'Disable service at boot', example: 'systemctl disable nginx' },
  { name: 'journalctl -f', description: 'Follow system logs', example: 'journalctl -f' },
  { name: 'shutdown -r', description: 'Reboot system', example: 'shutdown -r now' },
  { name: 'mkswap', description: 'Set up swap area', example: 'mkswap /dev/sdb1' },
  { name: 'partprobe', description: 'Inform OS of partition changes', example: 'partprobe' },
  { name: 'hdparm', description: 'Get/set hard disk parameters', example: 'hdparm -t /dev/sda' },
  { name: 'dmesg -T', description: 'Show kernel messages with timestamps', example: 'dmesg -T' },
  { name: 'fsck -a', description: 'Auto-repair filesystem', example: 'fsck -a /dev/sda1' },

  // Text Processing (15 new)
  { name: 'grep -r', description: 'Search recursively', example: 'grep -r "error" /var/log' },
  { name: 'grep -i', description: 'Case-insensitive search', example: 'grep -i "error" file1' },
  { name: 'sed -i', description: 'Edit file in-place', example: 'sed -i s/old/new/g file1' },
  { name: 'awk -F', description: 'Set field separator', example: 'awk -F: \'{print $1}\' file1' },
  { name: 'sort -r', description: 'Reverse sort', example: 'sort -r file1' },
  { name: 'uniq -i', description: 'Case-insensitive unique lines', example: 'uniq -i file1' },
  { name: 'cut -c', description: 'Cut by character position', example: 'cut -c 1-10 file1' },
  { name: 'tr -d', description: 'Delete characters', example: 'tr -d a-z < file1' },
  { name: 'wc -w', description: 'Count words', example: 'wc -w file1' },
  { name: 'wc -c', description: 'Count bytes', example: 'wc -c file1' },
  { name: 'diff -y', description: 'Side-by-side diff', example: 'diff -y file1 file2' },
  { name: 'comm -12', description: 'Show common lines', example: 'comm -12 file1 file2' },
  { name: 'tee -a', description: 'Append to file', example: 'echo test | tee -a file1' },
  { name: 'nl -b a', description: 'Number all lines', example: 'nl -b a file1' },
  { name: 'strings -n', description: 'Set minimum string length', example: 'strings -n 10 file1' },

  // User and Group Management (5 new)
  { name: 'passwd -l', description: 'Lock user account', example: 'passwd -l user1' },
  { name: 'passwd -u', description: 'Unlock user account', example: 'passwd -u user1' },
  { name: 'chage', description: 'Change user password expiry', example: 'chage -E 2025-12-31 user1' },
  { name: 'gpasswd', description: 'Administer group passwords', example: 'gpasswd group1' },
  { name: 'id -u', description: 'Show user ID', example: 'id -u user1' },

  // Package Management (5 new)
  { name: 'apt upgrade', description: 'Upgrade installed packages', example: 'apt upgrade' },
  { name: 'apt autoremove', description: 'Remove unused packages', example: 'apt autoremove' },
  { name: 'dnf remove', description: 'Remove package with DNF', example: 'dnf remove git' },
  { name: 'zypper up', description: 'Update with Zypper', example: 'zypper up' },
  { name: 'pacman -R', description: 'Remove with Pacman', example: 'pacman -R htop' },

  // Miscellaneous Utilities (10 new)
  { name: 'watch -n', description: 'Run command at intervals', example: 'watch -n 1 date' },
  { name: 'tee -i', description: 'Ignore interrupts', example: 'echo test | tee -i file1' },
  { name: 'bc -l', description: 'Calculator with math library', example: 'bc -l' },
  { name: 'cal -y', description: 'Show yearly calendar', example: 'cal -y' },
  { name: 'history -c', description: 'Clear command history', example: 'history -c' },
  { name: 'alias -p', description: 'Print all aliases', example: 'alias -p' },
  { name: 'env -i', description: 'Run in clean environment', example: 'env -i command' },
  { name: 'which -a', description: 'Show all paths for executable', example: 'which -a ls' },
  { name: 'sleep -s', description: 'Sleep in seconds', example: 'sleep 5s' },
  { name: 'xargs -n', description: 'Limit arguments per command', example: 'echo file1 | xargs -n 1 rm' },
];

export default function Commands() {
  const [search, setSearch] = useState('');
  const filteredCommands = LINUX_COMMANDS.filter(cmd =>
    cmd.name.toLowerCase().includes(search.toLowerCase()) ||
    cmd.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="flex-1 px-4">
        <Text className="text-white text-3xl font-bold mb-4 mt-6">Linux Commands</Text>
        <View className="flex-row items-center bg-gray-800 rounded-lg px-4 py-3 mb-6">
          <Ionicons name="search" size={24} color="#6b7280" />
          <TextInput
            className="flex-1 ml-2 text-white text-xl"
            placeholder="Search commands..."
            placeholderTextColor="#a1a1aa"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <FlatList
          data={filteredCommands}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({ item }) => (
            <View className="bg-blue-800 p-4 rounded-lg mb-3">
              <Text className="text-white text-xl font-bold mb-2">{item.name}</Text>
              <Text className="text-white text-lg mb-2">{item.description}</Text>
              <Text className="text-gray-300 text-lg">Example: {item.example}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text className="text-green-200 font-bold text-xl text-center mb-3">
              The command you entered wasn&apos;t found
            </Text>
          }
          contentContainerStyle={{ paddingBottom: 80 }} // Add padding to avoid Navbar overlap
        />
        <StatusBar style="light" />
      </View>
      <Navbar />
    </SafeAreaView>
  );
}