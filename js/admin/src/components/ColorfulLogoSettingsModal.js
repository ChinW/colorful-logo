import SettingsModal from 'flarum/components/SettingsModal';
import app from 'flarum/app';

export default class ColorfulLogoSettingsModal extends SettingsModal {
    className() {
        return 'ColorfulLogoSettingsModal Modal--medium';
    }

    title() {
        return app.translator.trans('chin-colorful-logo.admin.settings.title');
    }

    form() {
        return (
            <div className="Form-group">
                <label htmlFor="client_id">{app.translator.trans('chin-colorful-logo.admin.settings.image_label')}</label>
                <input type="text" className="FormControl" bidi={this.setting('chin.colorful-logo.imageUrl')}></input>

                <label htmlFor="client_id">{app.translator.trans('chin-colorful-logo.admin.settings.imageDev_label')}</label>
                <input type="text" className="FormControl" bidi={this.setting('chin.colorful-logo.imageUrl_development')}></input>
            </div>
        );
    }
}
