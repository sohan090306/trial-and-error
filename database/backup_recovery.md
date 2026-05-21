# Backup And Recovery

Create a full logical backup:

```bash
mysqldump -u root -p --single-transaction --routines --triggers nexafit_ai_gym > backups/nexafit_ai_gym.sql
```

Restore:

```bash
mysql -u root -p < backups/nexafit_ai_gym.sql
```

Recommended policy:

- Daily full logical backup during off-peak hours.
- Binary logs enabled for point-in-time recovery.
- Weekly restore drill into a staging database.
- Separate encrypted backup storage for invoice and member health records.
