import { extend } from 'flarum/extend';
import app from 'flarum/app';

import ColorfulLogoSettingsModal from 'chin/colorful-logo/components/ColorfulLogoSettingsModal';

app.initializers.add('chin/colorful-logo', () => {
    
    app.extensionSettings['chin-colorful-logo'] = () => app.modal.show(new ColorfulLogoSettingsModal());

});
