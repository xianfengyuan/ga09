const core = require('@actions/core')
const github = require('@actions/github')
const exec = require('@actions/exec')

function run() {
  const bucket = core.getInput('bucket', {required: true});
  const region = core.getInput('region', {required: true});
  const folder = core.getInput('dist-folder', {required: true});

  const s3uri = `s3://${bucket}`;
  exec.exec(`aws s3 sync ${folder} ${s3uri} --region ${region}`);

  core.notice('custom javascript action');

  const website = `https://${bucket}.s3.${region}.amazonaws.com/index.html`;
  core.setOutput('website', website);
}

run();
