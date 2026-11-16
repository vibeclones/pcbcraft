
export function pickProject(zipLimit) {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pc,.zip';
        input.oncancel = () => resolve(null);
        input.onchange = async () => {
            const file = input.files[0];
            if (!file) return resolve(null);
            try {
                if (file.size > zipLimit) throw new Error('Project ZIP exceeds the file size limit.');
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
