import os, sys, fnmatch

def scan_manifests(manifest_outfile, cicd_outfile):
    manifest_patterns = [
        "package.json", "yarn.lock", "pnpm-lock.yaml", "package-lock.json",
        "requirements.txt", "Pipfile", "Pipfile.lock", "go.mod", "Gemfile",
        "composer.json"
    ]
    
    manifests = []
    workflows = []
    
    for root, dirs, filenames in os.walk('.'):
        # Skip node_modules and .git
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if '.git' in dirs: dirs.remove('.git')
        
        for name in filenames:
            path = os.path.join(root, name)
            # Check manifests
            if name in manifest_patterns:
                manifests.append(path)
            
            # Check workflows
            if '.github/workflows' in path and (name.endswith('.yml') or name.endswith('.yaml')):
                workflows.append(path)

    with open(manifest_outfile, 'w', encoding='utf-8') as o:
        for m in manifests:
            o.write(m + "\n")
    print(f"WROTE {manifest_outfile}")

    with open(cicd_outfile, 'w', encoding='utf-8') as o:
        for w in workflows:
            o.write(w + "\n")
    print(f"WROTE {cicd_outfile}")

if __name__ == "__main__":
    manifest_outfile = sys.argv[1] if len(sys.argv) > 1 else "infra/audit/manifests.txt"
    cicd_outfile = sys.argv[2] if len(sys.argv) > 2 else "infra/audit/cicd_workflows.txt"
    scan_manifests(manifest_outfile, cicd_outfile)
