# GitHub Actions CI/CD Documentation

## 🚀 Overview

This repository is equipped with a comprehensive CI/CD pipeline using GitHub Actions. The workflows automatically build, test, analyze, and deploy your application.

---

## 📋 Workflows

### 1. **CI/CD Pipeline** (`ci.yml`)
**Triggers:** Push and Pull Requests to `main` and `develop` branches

**Jobs:**
- ✅ **Build & Test** - Runs on Node.js 18.x and 20.x
  - Checks out code
  - Installs dependencies
  - Runs linter
  - Builds the application
  - Uploads build artifacts

- 🔍 **Code Quality** - TypeScript type checking
  - Validates TypeScript compilation
  - Checks code formatting

- 🔒 **Security Audit** - Dependency vulnerability scanning
  - Runs `npm audit`
  - Checks for security vulnerabilities

**Status:** [![CI/CD Pipeline](https://github.com/johnnycsv232/GettUppent/actions/workflows/ci.yml/badge.svg)](https://github.com/johnnycsv232/GettUppent/actions/workflows/ci.yml)

---

### 2. **CodeQL Security Analysis** (`codeql.yml`)
**Triggers:** 
- Push to `main` and `develop`
- Pull Requests to `main`
- Weekly schedule (Mondays at 2 AM UTC)

**Features:**
- 🛡️ Advanced security scanning
- 🔍 Analyzes JavaScript and TypeScript
- 📊 Security-extended queries
- 🚨 Automatic vulnerability detection

**Status:** [![CodeQL](https://github.com/johnnycsv232/GettUppent/actions/workflows/codeql.yml/badge.svg)](https://github.com/johnnycsv232/GettUppent/actions/workflows/codeql.yml)

---

### 3. **Deployment** (`deploy.yml`)
**Triggers:** 
- Push to `main` branch
- Manual workflow dispatch

**Features:**
- 🏗️ Production build
- 🚀 Ready for Vercel deployment
- 📦 Build artifact generation

**Status:** [![Deploy](https://github.com/johnnycsv232/GettUppent/actions/workflows/deploy.yml/badge.svg)](https://github.com/johnnycsv232/GettUppent/actions/workflows/deploy.yml)

**To Enable Automatic Deployment:**
1. Install Vercel CLI: `npm i -g vercel`
2. Link your project: `vercel link`
3. Get your tokens:
   ```bash
   vercel whoami
   ```
4. Add GitHub Secrets:
   - `VERCEL_TOKEN` - Your Vercel token
   - `VERCEL_ORG_ID` - Your organization ID
   - `VERCEL_PROJECT_ID` - Your project ID
5. Uncomment the deployment step in `.github/workflows/deploy.yml`

---

### 4. **Dependency Review** (`dependency-review.yml`)
**Triggers:** Pull Requests to `main` and `develop`

**Features:**
- 📊 Automatic dependency analysis
- 🔒 Vulnerability detection
- 💬 PR comments with findings
- ⚠️ Fails on moderate+ severity issues

---

## 🔧 Setup Instructions

### Enable CodeQL (Recommended)
1. Go to your repository settings
2. Navigate to **Security & Analysis**
3. Enable **Dependency graph**
4. Enable **Dependabot alerts**
5. Enable **Code scanning** (CodeQL will run automatically)

### Configure Branch Protection
1. Go to **Settings** → **Branches**
2. Add rule for `main` branch:
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
   - Select: `Build & Test`, `Code Quality`, `Security Audit`
   - ✅ Require pull request reviews

---

## 📊 Monitoring Workflows

### View Workflow Runs
- Navigate to the **Actions** tab in your repository
- Click on any workflow to see detailed logs
- Monitor build times and success rates

### Workflow Badges
Add these badges to your README to show build status:

```markdown
[![CI/CD Pipeline](https://github.com/johnnycsv232/GettUppent/actions/workflows/ci.yml/badge.svg)](https://github.com/johnnycsv232/GettUppent/actions/workflows/ci.yml)
[![CodeQL](https://github.com/johnnycsv232/GettUppent/actions/workflows/codeql.yml/badge.svg)](https://github.com/johnnycsv232/GettUppent/actions/workflows/codeql.yml)
[![Deploy](https://github.com/johnnycsv232/GettUppent/actions/workflows/deploy.yml/badge.svg)](https://github.com/johnnycsv232/GettUppent/actions/workflows/deploy.yml)
```

---

## 🐛 Troubleshooting

### Build Failures
- Check the **Actions** tab for detailed error logs
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### CodeQL Issues
- CodeQL requires public repository or GitHub Advanced Security
- For private repos, you may need a GitHub Enterprise license

### Deployment Issues
- Verify Vercel tokens are correct
- Check that secrets are added to repository settings
- Ensure build completes successfully before deployment

---

## 🔄 Workflow Customization

### Adding New Jobs
Edit the workflow files in `.github/workflows/`:

```yaml
jobs:
  your-job-name:
    name: Your Job Display Name
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      # Add your steps here
```

### Changing Triggers
Modify the `on:` section:

```yaml
on:
  push:
    branches: [ main, develop, feature/* ]
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight
```

---

## 📈 Best Practices

1. **Always run CI on PRs** - Catch issues before merging
2. **Use branch protection** - Require passing checks
3. **Monitor security alerts** - Review CodeQL findings
4. **Keep dependencies updated** - Use Dependabot
5. **Cache dependencies** - Speed up builds with caching
6. **Use matrix builds** - Test multiple Node versions

---

## 🎯 Next Steps

- [ ] Enable branch protection rules
- [ ] Set up Vercel deployment
- [ ] Configure Dependabot for automatic updates
- [ ] Add integration tests
- [ ] Set up performance monitoring
- [ ] Configure notification webhooks

---

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [CodeQL Documentation](https://codeql.github.com/docs/)
- [Vercel Deployment Guide](https://vercel.com/docs/deployments/overview)
- [Next.js CI/CD Best Practices](https://nextjs.org/docs/deployment)

---

**Last Updated:** November 24, 2025  
**Maintained by:** GettUpp ENT Team
