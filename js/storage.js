class Storage {
    constructor(key) {
        this.store = window.localStorage;
        this.key = key;
    }

    clear() {
        this.store.clear();
    }

    /**
     * 
     * @param {any} item Item to be stored 
     */
    stockItem(item) {
      
        const currentItems = JSON.parse(this.store.getItem(this.key)) || [];

        const updatedItems = currentItems.concat(item);

        this.store.setItem(this.key, JSON.stringify(updatedItems));
    }
    /**
     * @returns Items currently stored
     */
    getItems() {
        return this.store.getItem(this.key);
    }
  }