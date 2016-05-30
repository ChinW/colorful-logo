<?php
/*******************************************************************************
 * Copyright (c) 2016. Chin.
 *
 * https://consiiii.me
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 ******************************************************************************/

namespace Chin\ColorfulLogo;

use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events) {

    $events->subscribe(Listeners\AddClientAssets::class);
    $events->subscribe(Listeners\LoadSettingsFromDatabase::class);

};