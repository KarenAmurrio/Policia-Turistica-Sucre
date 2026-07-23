async function cargarMuseos() {
    const contenedor = document.getElementById('lista-museos');

    try {
        // 1. Cargar el JSON
        const respuesta = await fetch('./assets/museos.json');
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
                <h3 class="text-lg font-black text-center leading-tight text-gray-900">${museo.nombre}</h3>
                
                <div class="grid grid-cols-5 gap-3 items-center">
                    <div class="col-span-2 rounded-xl overflow-hidden shadow aspect-square bg-gray-200">
                        <img src="${museo.imagen}" alt="${museo.nombre}" class="w-full h-full object-cover" loading="lazy">
                    </div>
                    
                    <div class="col-span-3 flex flex-col justify-between space-y-2">
                        <p class="text-[11px] leading-tight font-medium text-gray-800">
                            ${museo.descripcion}
                        </p>

                        <!-- Botón de Ubicación Estilizado -->
                        <a href="${museo.mapaUrl}" target="_blank" rel="noopener noreferrer" 
                           class="w-full py-2 px-3 bg-gradient-to-r from-[#1C3A27] to-[#2E4F36] hover:from-[#142A1C] hover:to-[#223B28] text-amber-300 font-extrabold text-[11px] rounded-xl shadow flex items-center justify-center gap-1.5 transition-all active:scale-95 border border-amber-300/30 tracking-wide">
                            <svg class="w-3.5 h-3.5 fill-current text-amber-300 shrink-0" viewBox="0 0 24 24">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                            <span>Ver Ubicación</span>
                        </a>
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