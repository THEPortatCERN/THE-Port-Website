<?php

namespace Drupal\projects_page\Controller;

use Drupal\Core\Controller\ControllerBase;

class ProjectsListController extends ControllerBase {
  public function content() {
    return [
      '#theme' => 'content_area',
      '#test_var' => $this->t('Test Value'),
      '#attached' => [
        'library' => [
          'projects_page/dist',
        ],
      ],
    ];
  }
}
