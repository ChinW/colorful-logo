<?php

/*
 * Copyright (c) 2016. Chin.
 *
 * https://consiiii.me
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code
 */

namespace Chin\ColorfulLogo\Listeners;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Event\PrepareApiAttributes;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;

class LoadSettingsFromDatabase
{
    protected $settings;
    // this is the prefix we use in the settings table in the database
    protected $packagePrefix = 'chin.colorful-logo.';
    // those are the fields we need to get from the database
    protected $fieldsToGet = [
        'imageUrl',
        'imageUrl_development',
    ];

    /**
     * Gets the settings variable. Called on Object creation.
     *
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    /**
     * Subscribes to the Flarum events.
     *
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(PrepareApiAttributes::class, [$this, 'prepareApiAttributes']);
    }

    /**
     * Get the setting values from the database and make them available
     * in the forum.
     *
     * @param PrepareApiAttributes $event
     */
    public function prepareApiAttributes(PrepareApiAttributes $event)
    {
        if ($event->isSerializer(ForumSerializer::class)) {
            foreach ($this->fieldsToGet as $field) {
                $event->attributes[$this->packagePrefix.$field] = $this->settings->get($this->packagePrefix.$field);
            }
        }
    }
}
