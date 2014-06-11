function ddg_spice_aur(response) {
    "use strict";
    if ("error" === response.type || !response.results || 0 === response.results.length) {
        return Spice.failed("aur");
    }
    var query = DDG.get_query().replace(/(aur|archlinux package|arch package|arch linux package)/, "");
    Spice.add({
        data: response.results,
        // header1          : response.results[0].Name + " (AUR)",
        sourceUrl: "https://aur.archlinux.org/packages/?O=0&K=" + query,
        sourceName: "ArchLinux User Repository",
        name: "Software",
        id: "aur",
        templates: {
            item: Spice.aur.aur
        }
    });
}