import json, collections, subprocess, os, sys

def analyze_filetypes(index_file, outfile):
    exts = collections.Counter()
    files_by_ext = collections.defaultdict(list)
    
    try:
        with open(index_file, 'r', encoding='utf-8') as f:
            for line in f:
                if not line.strip(): continue
                try:
                    o = json.loads(line)
                    ext = o['extension']
                    exts[ext] += 1
                    files_by_ext[ext].append(o['path'])
                except json.JSONDecodeError:
                    continue
    except FileNotFoundError:
        print(f"Error: {index_file} not found.")
        return

    top_exts = exts.most_common(50)
    
    # Sample LOC for top 10 extensions
    loc_estimates = {}
    for ext, count in top_exts[:10]:
        samples = files_by_ext[ext][:10]
        tot = 0
        cnt = 0
        for s in samples:
            if not os.path.exists(s): continue
            try:
                # Use 'wc -l' if available, else count lines in python
                # Windows might not have wc, so let's use python
                with open(s, 'rb') as f_in:
                    lines = sum(1 for _ in f_in)
                tot += lines
                cnt += 1
            except Exception:
                pass
        
        loc_estimates[ext] = {
            "sample_files": cnt,
            "avg_loc": tot // cnt if cnt else 0
        }

    out = {
        "counts": top_exts,
        "loc_estimates": loc_estimates
    }
    
    with open(outfile, 'w', encoding='utf-8') as o:
        o.write(json.dumps(out, indent=2))
    print(f"WROTE {outfile}")

if __name__ == "__main__":
    index_file = sys.argv[1] if len(sys.argv) > 1 else "infra/audit/repo_index.ndjson"
    outfile = sys.argv[2] if len(sys.argv) > 2 else "infra/audit/filetype_profile.json"
    analyze_filetypes(index_file, outfile)
