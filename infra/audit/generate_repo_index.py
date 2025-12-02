import sys,subprocess,json,os

def generate_index(outfile):
    # Get all files from git
    try:
        # Use -z for null termination to handle spaces in filenames
        files_bytes = subprocess.check_output(['git', 'ls-files', '-z']).split(b'\x00')
    except subprocess.CalledProcessError:
        print("Error: Not a git repository or git not found.")
        return

    out = []
    for p in files_bytes:
        if not p: continue
        try:
            path = p.decode('utf-8')
        except UnicodeDecodeError:
            continue # Skip non-utf8 filenames if any

        # get blob sha and size
        try:
            # git ls-files -s -- path
            # Output: 100644 <sha> 0\t<path>
            info = subprocess.check_output(['git', 'ls-files', '-s', '--', path]).decode().strip()
            if not info:
                continue
            
            parts = info.split()
            if len(parts) < 2:
                continue
                
            sha = parts[1]
            
            # git cat-file -s <sha>
            size_str = subprocess.check_output(['git', 'cat-file', '-s', sha]).decode().strip()
            size = int(size_str)
        except Exception as e:
            sha = None
            size = 0
        
        ext = path.rsplit('.', 1)[-1] if '.' in path else "none"
        depth = path.count('/')
        
        out.append({
            "path": path,
            "size_bytes": size,
            "extension": ext,
            "depth": depth,
            "blob_sha": sha
        })

    with open(outfile, 'w', encoding='utf-8') as o:
        for r in out:
            o.write(json.dumps(r) + "\n")
    print(f"WROTE {outfile}")

if __name__ == "__main__":
    outfile = sys.argv[1] if len(sys.argv) > 1 else "infra/audit/repo_index.ndjson"
    generate_index(outfile)
