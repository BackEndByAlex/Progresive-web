const MemoryMenuCSS = document.createElement('template')
MemoryMenuCSS.innerHTML = `
<style>
  .menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 100%;
    background: #f4f4f9;
  }

  .menu button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    transition: background-color 0.3s;
  }
    
  .menu button:hover {
    background-color: #0056b3;
  }
</style>
`
export { MemoryMenuCSS }
