import zipfile, os, sys

def create_business_bundle(outfile):
    files_to_zip = [
        "GETTUPP_MASTER_UNIFIED_Q4_2025_FULL.json",
        "GETTUPP_MASTER_UNIFIED_Q4_2025_FULL_with_GettUpp_Girls.json",
        "FULL_SYSTEM_AUDIT.md",
        "GAP_ANALYSIS.md",
        "GO_NO_GO.md",
        "LAUNCH_STATUS.md",
        "PROJECT_RULES.md",
        "PROJECT_STATUS_REPORT.md",
        "ROADMAP.md",
        "UX_AUDIT_REPORT.md",
        "AUDIT_REPORT.md",
        "CMS_IMPROVEMENTS.md"
    ]
    
    with zipfile.ZipFile(outfile, 'w', zipfile.ZIP_DEFLATED) as zf:
        for f in files_to_zip:
            if os.path.exists(f):
                zf.write(f, arcname=os.path.basename(f))
                print(f"Added {f}")
            else:
                print(f"Warning: {f} not found")
    
    print(f"Created {outfile}")

if __name__ == "__main__":
    outfile = sys.argv[1] if len(sys.argv) > 1 else "business_docs.zip"
    create_business_bundle(outfile)
