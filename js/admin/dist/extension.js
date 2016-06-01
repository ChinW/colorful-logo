System.register('chin/colorful-logo/components/ColorfulLogoSettingsModal', ['flarum/components/SettingsModal', 'flarum/app'], function (_export) {
    'use strict';

    var SettingsModal, app, ColorfulLogoSettingsModal;
    return {
        setters: [function (_flarumComponentsSettingsModal) {
            SettingsModal = _flarumComponentsSettingsModal['default'];
        }, function (_flarumApp) {
            app = _flarumApp['default'];
        }],
        execute: function () {
            ColorfulLogoSettingsModal = (function (_SettingsModal) {
                babelHelpers.inherits(ColorfulLogoSettingsModal, _SettingsModal);

                function ColorfulLogoSettingsModal() {
                    babelHelpers.classCallCheck(this, ColorfulLogoSettingsModal);
                    babelHelpers.get(Object.getPrototypeOf(ColorfulLogoSettingsModal.prototype), 'constructor', this).apply(this, arguments);
                }

                babelHelpers.createClass(ColorfulLogoSettingsModal, [{
                    key: 'className',
                    value: function className() {
                        return 'ColorfulLogoSettingsModal Modal--medium';
                    }
                }, {
                    key: 'title',
                    value: function title() {
                        return app.translator.trans('chin-colorful-logo.admin.settings.title');
                    }
                }, {
                    key: 'form',
                    value: function form() {
                        return m(
                            'div',
                            { className: 'Form-group' },
                            m(
                                'label',
                                { htmlFor: 'client_id' },
                                app.translator.trans('chin-colorful-logo.admin.settings.image_label')
                            ),
                            m('input', { type: 'text', className: 'FormControl', bidi: this.setting('chin.colorful-logo.imageUrl') }),
                            m(
                                'label',
                                { htmlFor: 'client_id' },
                                app.translator.trans('chin-colorful-logo.admin.settings.imageDev_label')
                            ),
                            m('input', { type: 'text', className: 'FormControl', bidi: this.setting('chin.colorful-logo.imageUrl_development') })
                        );
                    }
                }]);
                return ColorfulLogoSettingsModal;
            })(SettingsModal);

            _export('default', ColorfulLogoSettingsModal);
        }
    };
});;
System.register('chin/colorful-logo/main', ['flarum/extend', 'flarum/app', 'chin/colorful-logo/components/ColorfulLogoSettingsModal'], function (_export) {
    'use strict';

    var extend, app, ColorfulLogoSettingsModal;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp['default'];
        }, function (_chinColorfulLogoComponentsColorfulLogoSettingsModal) {
            ColorfulLogoSettingsModal = _chinColorfulLogoComponentsColorfulLogoSettingsModal['default'];
        }],
        execute: function () {

            app.initializers.add('chin/colorful-logo', function () {

                app.extensionSettings['chin-colorful-logo'] = function () {
                    return app.modal.show(new ColorfulLogoSettingsModal());
                };
            });
        }
    };
});