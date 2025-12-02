import json, sys, collections

def analyze_structure(index_file, outfile):
    dirs = collections.Counter()
    bytes_by_dir = collections.Counter()
    total_files = 0
    
    try:
        with open(index_file, 'r', encoding='utf-8') as f:
            for line in f:
                if not line.strip(): continue
                try:
                    o = json.loads(line)
                    total_files += 1
                    p = o['path']
                    size = o.get('size_bytes', 0)
                    
                    parts = p.split('/')
                    # Analyze up to depth 6
                    for i in range(1, min(len(parts), 7)):
                        d = '/'.join(parts[:i])
                        dirs[d] += 1
                        bytes_by_dir[d] += size
                except json.JSONDecodeError:
                    continue
    except FileNotFoundError:
        print(f"Error: {index_file} not found.")
        return

    top = [{"path": k, "file_count": v, "bytes": bytes_by_dir[k]} for k, v in dirs.most_common(500)]
    
    out = {
        "total_files": total_files,
        "top_paths": top
    }
    
    with open(outfile, 'w', encoding='utf-8') as o:
        o.write(json.dumps(out, indent=2))
    print(f"WROTE {outfile}")

if __name__ == "__main__":
    index_file = sys.argv[1] if len(sys.argv) > 1 else "infra/audit/repo_index.ndjson"
    outfile = sys.argv[2] if len(sys.argv) > 2 else "infra/audit/structure.json"
    analyze_structure(index_file, outfile)
