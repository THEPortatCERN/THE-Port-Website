<?php

namespace Drupal\projects_page\Controller;

use Drupal\Core\Controller\ControllerBase;

class ProjectsListController extends ControllerBase {
  public function content() {
    return [
      '#markup' => '<div id="app"></div>',
      '#attached' => [
        'library' => [
          'projects_page/dist',
        ],
      ],
    ];
  }
}
