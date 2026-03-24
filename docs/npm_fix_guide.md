# npm Dependency Fix Guide

## Problem

Project failing to start due to npm dependency integrity issues (EINTEGRITY errors).

---

## Solution Steps

### Step 1: Clear npm Cache
```bash
npm cache clean --force
```

### Step 2: Update package.json
Check for incompatible versions in:
- `react-scripts` version
- Any custom forked dependencies

### Step 3: Reinstall Fresh
```bash
rm -rf node_modules
npm cache clean --force
npm install
```

### Step 4: Verify Installation
```bash
npm list
```

---

## Common Issues & Fixes

### Issue: react-scripts integrity mismatch
**Fix**: Update to latest compatible version
```json
"react-scripts": "5.0.1"  // or newer if React 18 supports it
```

### Issue: Corrupted node_modules
**Fix**: Delete and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Network errors
**Fix**: Check internet, try offline install
```bash
npm install --offline
```

---

## Post-Fix Verification

- [ ] `npm install` completes without errors
- [ ] Project runs with `npm start`
- [ ] All components render correctly
- [ ] No console errors

---

## Prevention

- Use `npm ci` for reproducible installs
- Keep `package-lock.json` committed
- Regular dependency updates
- Use `npm audit` for security checks
