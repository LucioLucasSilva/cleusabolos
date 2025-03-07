export async function parseContactXML() {
  try {
    const response = await fetch('/data/contact.xml');
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    
    return {
      address: xmlDoc.querySelector('address')?.textContent || '',
      whatsapp: xmlDoc.querySelector('whatsapp')?.textContent || '',
      instagram: xmlDoc.querySelector('instagram')?.textContent || '',
      facebook: xmlDoc.querySelector('facebook')?.textContent || '',
    };
  } catch (error) {
    console.error('Error parsing XML:', error);
    return null;
  }
}