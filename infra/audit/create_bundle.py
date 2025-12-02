import zipfile, os, sys

def create_bundle(outfile):
    files_to_zip = [
        "infra/audit/repo_index.ndjson",
        "infra/audit/structure.json",
        "infra/audit/filetype_profile.json",
        "infra/audit/du_top.json",
        "infra/audit/surface_risk_paths_limited.txt",
        "infra/audit/manifests.txt",
        "infra/audit/cicd_workflows.txt",
        "runner_config.json"
    ]
    
    with zipfile.ZipFile(outfile, 'w', zipfile.ZIP_DEFLATED) as zf:
        for f in files_to_zip:
            if os.path.exists(f):
                # Add file to zip with the same relative path
                zf.write(f, arcname=os.path.basename(f) if f == "runner_config.json" else f)
                print(f"Added {f}")
            else:
                print(f"Warning: {f} not found")
    
    print(f"Created {outfile}")

if __name__ == "__main__":
    outfile = sys.argv[1] if len(sys.argv) > 1 else "audit_bundle.zip"
    create_bundle(outfile)
