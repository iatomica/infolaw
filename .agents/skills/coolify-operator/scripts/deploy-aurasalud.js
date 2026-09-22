const CoolifyClient = require('./coolify-cli');

async function deployAuraSalud() {
  const client = new CoolifyClient();
  const appUuid = 'kgkkoc0cs4o0g0wswk4gsk4k';

  console.log(`[Coolify Operator] Iniciando despliegue de AURA Salud (${appUuid})...`);

  const deployRes = await client.redeployApp(appUuid);
  console.log('[Coolify Operator] Despliegue disparado en Coolify:', deployRes);

  console.log('[Coolify Operator] Monitoreando despliegue y estado de salud...');
  const result = await client.waitForDeploymentAndHealth(appUuid, 300);
  console.log('[Coolify Operator] ¡DESPLIEGUE EXITOSO!', result);
}

deployAuraSalud().catch(err => {
  console.error('[Coolify Operator] Error durante despliegue:', err.message);
  process.exit(1);
});
