async function cargarMuseos() {
    const contenedor = document.getElementById('lista-museos');

    try {
        // 1. Cargar el JSON
        const respuesta = await fetch('./public/museos.json');
        const museos = await respuesta.json();

        // Limpiar el mensaje de carga
        contenedor.innerHTML = '';

        // 2. Iterar sobre cada museo y generar el HTML
        museos.forEach(museo => {
            // Formatear los horarios
            const horariosHtml = museo.horarios.map(h => `
                <p class="text-[11px] italic mt-0.5">${h.dias}</p>
                <p class="text-xs font-bold text-gray-800">${h.horas}</p>
            `).join('');

            // Formatear los costos
            const costosHtml = museo.costos.map(c => `
                <p class="text-xs font-semibold text-gray-800"><span class="italic">${c.concepto}</span> ${c.precio}</p>
            `).join('');

            // Construir la tarjeta
            const tarjeta = document.createElement('div');
            tarjeta.className = "bg-[#C2DFCD] text-gray-900 rounded-2xl p-4 shadow-md border border-policia-dorado/40 space-y-3";
            
            tarjeta.innerHTML = `
                <h3 class="text-lg font-black text-center leading-tight">${museo.nombre}</h3>
                <div class="grid grid-cols-5 gap-3 items-start">
                    <div class="col-span-2 rounded-xl overflow-hidden shadow aspect-square bg-gray-200">
                        <img src="${museo.imagen}" alt="${museo.nombre}" class="w-full h-full object-cover" loading="lazy">
                    </div>
                    <div class="col-span-3 space-y-1.5">
                        <a href="${museo.mapaUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-xs font-bold text-green-900 underline hover:text-green-700">
                            📍 Click para ver la Ubicación
                        </a>
                        <p class="text-[11px] leading-tight font-medium text-gray-800">
                            ${museo.descripcion}
                        </p>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-2 pt-2 border-t border-black/10 text-center">
                    <div>
                        <h4 class="font-bold text-xs text-black">Horarios</h4>
                        ${horariosHtml}
                    </div>
                    <div>
                        <h4 class="font-bold text-xs text-black">Costos</h4>
                        ${costosHtml}
                    </div>
                </div>
            `;

            contenedor.appendChild(tarjeta);
        });

    } catch (error) {
        console.error('Error cargando los museos:', error);
        contenedor.innerHTML = `<p class="text-center text-xs text-red-400">Error al cargar la información.</p>`;
    }
}

// Ejecutar al abrir o al cargar la página
document.addEventListener('DOMContentLoaded', cargarMuseos);