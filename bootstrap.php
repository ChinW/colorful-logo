<?php
use Flarum\Event\PostWillBeSaved;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Event\ConfigureClientView;

return function (Dispatcher $events) {
    $events->listen(PostWillBeSaved::class, function (PostWillBeSaved $event) {
        $event->post->content = 'This is not what I wrote!';
    });

    $events->listen(ConfigureClientView::class, function (ConfigureClientView $event) {
        if ($event->isForum()) {
            $event->addAssets([
                    __DIR__.'/js/forum/dist/extension.js',
                    __DIR__.'/less/forum/extension.less'
                ]);
            $event->addBootstrapper('chin/colorful-logo/main');
        }
    });
};