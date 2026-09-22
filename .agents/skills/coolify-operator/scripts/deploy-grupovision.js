const CoolifyClient = require('./coolify-cli');

async function deployGrupoVision() {
  const client = new CoolifyClient();
  const appUuid = 'd8o8ogw40kcw4s00owow08k8';

  console.log(`[Coolify Operator] Configurando aplicación Grupo Visión (UUID: ${appUuid})...`);

  // Update application configuration with domains field
  const updateResult = await client.updateApp(appUuid, {
    name: 'Grupo Visión Bariloche',
    description: 'Plataforma Receptiva y Gestión de Excursiones Bariloche',
    domains: 'https://grupovision.iatomica.com',
    build_pack: 'dockerfile',
    ports_exposes: '80'
  });
  console.log('[Coolify Operator] Configuración actualizada en Coolify:', updateResult.name || 'OK');

  console.log(`[Coolify Operator] Disparando despliegue de ${appUuid}...`);
  const deployRes = await client.redeployApp(appUuid);
  console.log('[Coolify Operator] Despliegue iniciado:', deployRes);

  console.log('[Coolify Operator] Monitoreando estado del despliegue...');
  const health = await client.waitForDeploymentAndHealth(appUuid, 300);
  console.log('[Coolify Operator] ¡DESPLIEGUE EXITOSO!', health);
}

deployGrupoVision().catch(err => {
  console.error('[Coolify Operator] Error en despliegue:', err.message);
  process.exit(1);
});
