import os, sys, json

def get_dir_size(path):
    total = 0
    try:
        for entry in os.scandir(path):
            if entry.is_file(follow_symlinks=False):
                total += entry.stat().st_size
            elif entry.is_dir(follow_symlinks=False):
                total += get_dir_size(entry.path)
    except Exception:
        pass
    return total

def scan_du(outfile):
    # We want top directories at depth 3
    # This can be slow in python, but let's try to be smart
    # We'll just check top level and maybe one level down for now to be fast
    # Or rely on the repo_index if we had it loaded, but let's do a simple scan
    
    sizes = []
    root = '.'
    
    # Walk to depth 3
    for root_dir, dirs, files in os.walk(root):
        depth = root_dir.count(os.sep)
        if depth > 3:
            del dirs[:] # Don't go deeper
            continue
            
        if root_dir == '.': continue
        if '.git' in root_dir or 'node_modules' in root_dir: continue
        
        size = get_dir_size(root_dir)
        sizes.append((size, root_dir))
    
    sizes.sort(key=lambda x: x[0], reverse=True)
    top = sizes[:200]
    
    out = [{"size": f"{s[0]/1024/1024:.2f}MB", "path": s[1]} for s in top]
    
    with open(outfile, 'w', encoding='utf-8') as o:
        o.write(json.dumps(out, indent=2))
    print(f"WROTE {outfile}")

if __name__ == "__main__":
    outfile = sys.argv[1] if len(sys.argv) > 1 else "infra/audit/du_top.json"
    scan_du(outfile)
