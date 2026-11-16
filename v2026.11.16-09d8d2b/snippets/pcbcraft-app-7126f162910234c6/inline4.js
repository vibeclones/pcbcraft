
    function chooseLibrary(folder,maxFiles,maxFileBytes,maxSourceBytes) {
      return new Promise((resolve,reject)=>{
        const input=document.createElement('input'); input.type='file';
        if(folder){input.webkitdirectory=true;input.multiple=true;}else{input.accept='.json';}
        input.oncancel=()=>resolve(null);
        input.onchange=async()=>{try{
          const files=input.files||[];if(!files.length)return resolve(null);
          if(!folder){if(files[0].size>maxSourceBytes*2)throw Error(`Library bundle exceeds ${maxSourceBytes*2/1048576} MiB`);return resolve(await files[0].arrayBuffer());}
          const documents={};const problems=[];let total=0,count=0;
          for(const file of files){
            const pieces=file.webkitRelativePath.split('/');pieces.shift();const path=pieces.join('/');
            // Root notices are not native documents; preserve the native folder adapter's scope.
            if(path!=='library.json'&&!/^(symbols|footprints|categories|parts|manufacturer-parts)\//.test(path))continue;
            if(++count>maxFiles)throw Error(`Library source exceeds ${maxFiles} files`);
            if(path!=='library.json'&&!/^(symbols|footprints|categories|parts|manufacturer-parts)\/[^/]+\.json$/.test(path)){problems.push(path+': unsupported native item path');continue;}
            if(file.size>maxFileBytes){if(path==='library.json')throw Error('Manifest exceeds 1 MiB');problems.push(path+': file exceeds 1 MiB');continue;}
            if((total+=file.size)>maxSourceBytes)throw Error(`Library source exceeds ${maxSourceBytes/1048576} MiB`);
            if(Object.hasOwn(documents,path))throw Error('Duplicate library path');
            try{documents[path]=new TextDecoder('utf-8',{fatal:true}).decode(await file.arrayBuffer());}catch(error){if(path==='library.json')throw error;problems.push(path+': could not read UTF-8 document');}
          }
          resolve({documents,problems});
        }catch(error){reject(error)}};input.click();
      });
    }
    export function rememberLibrarySources(key,text){localStorage.setItem(key,text)}
    export function pickLibraryBundle(...limits){return chooseLibrary(false,...limits)}
    export function pickLibraryFolder(...limits){return chooseLibrary(true,...limits)}
    