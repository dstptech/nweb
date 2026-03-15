# Debug & Test Files

This folder contains temporary test scripts, debug utilities, and data population scripts used during development and testing.

## Contents

### Test Files (test\_\*.py)

- `test_*.py` - Various endpoint and feature tests created during development

### Debug/Check Files (check*\*.py, debug*\*.py)

- `check_*.py` - Diagnostic scripts to verify configuration and data
- `debug_*.py` - Debug utilities for troubleshooting specific features

### Data Population (populate\_\*.py)

- Population scripts for seeding database with test data

### Utility Scripts

- `show_tables.py` - Display database tables and schema
- `update_models.py` - Model update utilities
- `write_*.py` - File generation scripts

## Usage

These scripts are primarily for development and debugging. Run them from the `dstp_backend` directory:

```bash
python debug_tests/test_media_upload.py
python debug_tests/check_admin.py
# etc.
```

## Note

These are not part of the production application and should not be deployed to production.
