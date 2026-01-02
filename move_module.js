const fs = require('fs');
const path = require('path');

const src = 'd:\\my-nest-project\\src\\modules\\users';
const dest = 'd:\\my-nest-project\\src\\modules\\user\\users';

console.log(`Moving from ${src} to ${dest}`);

try {
  if (!fs.existsSync(src)) {
    console.error('Source directory does not exist!');
    process.exit(1);
  }

  // Create destination parent text if needed (though user/ exists)
  fs.mkdirSync(dest, { recursive: true });

  // Copy
  fs.cpSync(src, dest, { recursive: true });
  console.log('Copy successful');

  // Verify copy (simple check)
  if (fs.existsSync(path.join(dest, 'users.module.ts'))) {
    // Delete source
    fs.rmSync(src, { recursive: true, force: true });
    console.log('Delete successful');
  } else {
    console.error('Copy verification failed, not deleting source');
    process.exit(1);
  }
} catch (err) {
  console.error('Error during move:', err);
  process.exit(1);
}
