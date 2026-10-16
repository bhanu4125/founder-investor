async function run() {
  const html = await fetch('http://localhost:3000').then(r => r.text());
  const match = html.match(/href="(\/_next\/static\/css\/[^"]+)"/);
  const css = await fetch('http://localhost:3000' + match[1]).then(r => r.text());
  console.log("CSS Length:", css.length);
  console.log("text-amber-400:", css.includes('text-amber-400'));
  console.log("col-span-4:", css.includes('col-span-4'));
  console.log("rounded-2xl:", css.includes('rounded-2xl'));
  console.log("backdrop-blur-xl:", css.includes('backdrop-blur-xl'));
  console.log("glass-panel:", css.includes('glass-panel'));
}
run();
