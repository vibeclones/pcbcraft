
export function pickProject(jsonLimit, zipLimit) {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pc,.zip,.json';
        input.oncancel = () => resolve(null);
        input.onchange = async () => {
            const file = input.files[0];
            if (!file) return resolve(null);
            try {
                if (file.size > zipLimit) throw new Error('Project ZIP exceeds the file size limit.');
                if (file.size > jsonLimit) {
                    const header = new DataView(await file.slice(0, 4).arrayBuffer()).getUint32(0);
                    if (![0x504b0304, 0x504b0506, 0x504b0708].includes(header)) {
                        throw new Error('Project JSON exceeds the file size limit.');
                    }
                }
                resolve(await file.arrayBuffer());
            } catch (error) { reject(error); }
        };
        input.click();
    });
}

let unsaved = false;
let warning = false;
export function setUnsaved(flag) {
    unsaved = flag;
    if (!warning) {
        warning = true;
        window.addEventListener('beforeunload', (event) => {
            if (unsaved) {
                event.preventDefault();
                event.returnValue = '';
            }
        });
    }
}

export function downloadProject(bytes, name) {
    const url = URL.createObjectURL(new Blob([bytes], {type: 'application/zip'}));
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
}
