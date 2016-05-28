<?php
/*******************************************************************************
 * Copyright (c) 2016. Chin.
 *
 * https://consiiii.me
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 ******************************************************************************/
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