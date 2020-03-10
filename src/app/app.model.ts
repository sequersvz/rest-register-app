export interface FormValues {
    Name: string;
    Description?: string;
    Categories?: string;
    Tags?: string;
    Direction?: string;
}

export interface FormSanitizes {
    [name: string]: {Direction?: string, Geopoint?: CoordinatesModel};
}

export interface CoordinatesModel {
    lat: number;
    lng: number;
}

// needs a better html sanitize but for now its okay

export const modalHtmlInstructions = `
<p>
El objetivo de este formulario es recopilar datos de restaurantes o locales especificos de comida en
las diferentes zonas de Valencia y San diego, tanto norte como sur, sin distincion alguna.
</p>
<p>
Es posible añadir locales alejado de dichas zonas pero estos seran filtrados posteriormente, abstenerse de hacerlo.
</p>
<p>
El formulario cuenta esta formado de 5 campos, 2 obligatorios y los demas opcionales:
</br>
</br>
&bull; Nombre: Obligatorio, es el nombre exacto del restaurante o local de comida.
</br>
</br>
&bull; Descripcion: Opcional, una descripcion del local.
</br>
</br>
&bull; Categorias: Opcional, categorias de comida separadas por una coma ejemplo: dulces, embustidos, carnes, comida vegana.
</br>
</br>
&bull; Etiquetas: Opcional, etiquetas de comida separadas por una coma y hace referencia a como usted ve los servicios
del local ejemplo: buena ubicacion, excelente ambiente, bajos precios.
</br>
</br>
&bull; Ubicacion: Obligatorio, se pueden elegir dos formas:
</br>
&bull;&bull; Ubicacion actual, ubicacion por GPS, al pulsar sobre el boton se te preguntara si deseas compartir
tu ubicacion, obligatorio permitirla, si no, no podras utilizar la funcion de geolocalizacion.
</br>
&bull;&bull; Manualmente, ubicacion por direccion escrita, no debe de ser la direccion exacta pero si seria de
gran ayudar utilizar un punto de referencia cercano.
</p>
<div nzType="flex" nzJustify="center" class="info-footer-container">
  <strong>
  No es necesario estar presente en el local para llenar el formulario,
  si conoces la ubicacion exacta del mismo tambien puedes
  participar en este proyecto.
  </strong>
</div>
`;
