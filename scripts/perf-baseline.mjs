import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const distAssetsDir = path.join(root, 'dist', 'assets');
const reportDir = path.join(root, 'reports', 'perf-baseline');
const latestReportPath = path.join(reportDir, 'latest.json');

function formatLocalTimestamp(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function readAssetStats() {
  if (!fs.existsSync(distAssetsDir)) {
    throw new Error('dist/assets 不存在，请先执行 npm run build');
  }

  const files = fs.readdirSync(distAssetsDir).filter((name) => name.endsWith('.js') || name.endsWith('.css'));
  const entries = files.map((name) => {
    const abs = path.join(distAssetsDir, name);
    const sizeBytes = fs.statSync(abs).size;
    return {
      name,
      ext: path.extname(name),
      sizeBytes,
      sizeKB: Number((sizeBytes / 1024).toFixed(2)),
    };
  });

  entries.sort((a, b) => b.sizeBytes - a.sizeBytes);

  const indexEntry = entries.find((e) => /^index-.*\.js$/.test(e.name)) || null;
  const panoViewerEntry = entries.find((e) => /^PanoViewer-.*\.js$/.test(e.name)) || null;
  const threeRendererEntry = entries.find((e) => /^three-renderer-.*\.js$/.test(e.name)) || null;
  const threeMathEntry = entries.find((e) => /^three-math-.*\.js$/.test(e.name)) || null;

  const totalJsBytes = entries.filter((e) => e.ext === '.js').reduce((sum, e) => sum + e.sizeBytes, 0);
  const totalCssBytes = entries.filter((e) => e.ext === '.css').reduce((sum, e) => sum + e.sizeBytes, 0);

  return {
    generatedAt: formatLocalTimestamp(new Date()),
    metrics: {
      indexJsKB: indexEntry ? indexEntry.sizeKB : null,
      panoViewerJsKB: panoViewerEntry ? panoViewerEntry.sizeKB : null,
      threeRendererJsKB: threeRendererEntry ? threeRendererEntry.sizeKB : null,
      threeMathJsKB: threeMathEntry ? threeMathEntry.sizeKB : null,
      threeRenderMathCombinedKB: Number(
        (
          ((threeRendererEntry ? threeRendererEntry.sizeBytes : 0) +
            (threeMathEntry ? threeMathEntry.sizeBytes : 0)) /
          1024
        ).toFixed(2),
      ),
      totalJsKB: Number((totalJsBytes / 1024).toFixed(2)),
      totalCssKB: Number((totalCssBytes / 1024).toFixed(2)),
    },
    topAssets: entries.slice(0, 12),
  };
}

function main() {
  const report = readAssetStats();
  fs.mkdirSync(reportDir, { recursive: true });
  fs.writeFileSync(latestReportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

  console.log('性能基线报告已生成: reports/perf-baseline/latest.json');
  console.log(`- 生成时间: ${report.generatedAt}`);
  console.log(`- index 主包: ${report.metrics.indexJsKB ?? 'N/A'} kB`);
  console.log(`- PanoViewer: ${report.metrics.panoViewerJsKB ?? 'N/A'} kB`);
  console.log(`- three-renderer: ${report.metrics.threeRendererJsKB ?? 'N/A'} kB`);
  console.log(`- three-math: ${report.metrics.threeMathJsKB ?? 'N/A'} kB`);
  console.log(`- three 合计: ${report.metrics.threeRenderMathCombinedKB ?? 'N/A'} kB`);
  console.log(`- JS 总量: ${report.metrics.totalJsKB} kB`);
  console.log(`- CSS 总量: ${report.metrics.totalCssKB} kB`);
}

main();
