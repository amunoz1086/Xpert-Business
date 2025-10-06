export function saveDraft(formKey, data) {
    try {
        localStorage.setItem(`draft_${formKey}`, JSON.stringify(data));
    } catch (e) {
        console.warn('No se pudo guardar draft:', e);
    }
}

export function loadDraft(formKey) {
    try {
        const raw = localStorage.getItem(`draft_${formKey}`);
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        console.warn('No se pudo cargar draft:', e);
        return null;
    }
}

export function clearDraft(formKey) {
    localStorage.removeItem(`draft_${formKey}`);
}

export function clearAllDrafts() {
    Object.keys(localStorage)
      .filter(key => key.startsWith('draft_'))
      .forEach(key => localStorage.removeItem(key));
  }