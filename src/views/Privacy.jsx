const Privacy = () => (
  <main className="content-shell">
    <article className="privacy-card">
      <p className="detail-category">Recetas-web</p>
      <h1>Política de privacidad</h1>
      <p className="privacy-updated">Última actualización: 20 / 9 / 2026</p>

      <section>
        <h2>1. Responsable</h2>
        <p>
          El responsable de este proyecto es <strong>Gabriel Discenza</strong>.
          Para consultas relacionadas con privacidad, puedes escribir a:
          <strong> discenzagabriel41@gmail.com</strong>.
        </p>
      </section>

      <section>
        <h2>2. Información que recopilamos</h2>
        <p>
          Recetas-web recopila los datos necesarios para crear y administrar una cuenta:
          nombre de usuario, dirección de email y contraseña. También almacena la información
          de las recetas que el usuario decide publicar, como nombre, ingredientes, instrucciones,
          categoría, etiquetas y datos de creación.
        </p>
      </section>

      <section>
        <h2>3. Uso de la información</h2>
        <p>
          La información se utiliza para autenticar usuarios, permitir la creación y gestión de
          recetas, mostrar quién creó cada receta y mantener las preferencias de favoritos.
          No se vende ni se comparte con terceros con fines comerciales.
        </p>
      </section>

      <section>
        <h2>4. Servicios utilizados</h2>
        <p>
          La aplicación utiliza Firebase Authentication para las cuentas y Cloud Firestore para
          almacenar recetas y datos asociados. Estos servicios pueden procesar la información de
          acuerdo con sus propias políticas de privacidad y seguridad.
        </p>
      </section>

      <section>
        <h2>5. Seguridad y conservación</h2>
        <p>
          Se aplican reglas de acceso para que los usuarios autenticados puedan gestionar recetas
          y para que solo el creador pueda editarlas o eliminarlas. La información se conserva
          mientras la cuenta o las recetas permanezcan activas.
        </p>
      </section>

      <section>
        <h2>6. Derechos del usuario</h2>
        <p>
          El usuario puede solicitar acceso, corrección o eliminación de sus datos escribiendo a
          <strong> discenzagabriel41@gmail.com </strong>. También puede solicitar el cierre de
          su cuenta y la eliminación de sus recetas.
        </p>
      </section>

      <section>
        <h2>7. Cambios en esta política</h2>
        <p>
          Esta política puede actualizarse cuando se incorporen nuevas funciones o cambien los
          servicios utilizados. La fecha de actualización se indicará al comienzo de esta página.
        </p>
      </section>

      <p className="privacy-note">
        Este texto es un modelo informativo para el proyecto.
      </p>
    </article>
  </main>
)

export default Privacy
