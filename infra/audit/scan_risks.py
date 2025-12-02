import os, sys

def scan_risks(outfile):
    keywords = [
        "auth", "login", "password", "secret", "api_key", "apikey", "api-key", 
        "token", "jwt", "env", ".env", "credentials", "db_pass", "conn_string", 
        "stripe", "firebase", "webhook"
    ]
    
    # We will use git ls-files to get the list of files to check paths against
    # This is safer/faster than walking the directory if we only care about tracked files
    try:
        import subprocess
        files = subprocess.check_output(['git', 'ls-files']).decode('utf-8').splitlines()
    except Exception:
        # Fallback to os.walk if git fails
        files = []
        for root, dirs, filenames in os.walk('.'):
            if '.git' in dirs: dirs.remove('.git')
            if 'node_modules' in dirs: dirs.remove('node_modules')
            for name in filenames:
                files.append(os.path.join(root, name))

    matches = []
    for f in files:
        lower_f = f.lower()
        for k in keywords:
            if k in lower_f:
                matches.append(f)
                break
    
    # Limit to top 5000 to avoid overwhelming
    matches = matches[:5000]
    
    with open(outfile, 'w', encoding='utf-8') as o:
        for m in matches:
            o.write(m + "\n")
    print(f"WROTE {outfile}")

if __name__ == "__main__":
    outfile = sys.argv[1] if len(sys.argv) > 1 else "infra/audit/surface_risk_paths_limited.txt"
    scan_risks(outfile)
