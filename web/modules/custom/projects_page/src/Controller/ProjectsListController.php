<?php

namespace Drupal\projects_page\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\projects_page\ProjectListService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\DependencyInjection\ContainerInterface;

class ProjectsListController extends ControllerBase {

  /** @var \Drupal\project_list\ProjectListService */
  protected $projectListService;

  public function __construct(ProjectListService $projectListService) {
    $this->projectListService = $projectListService;
  }

  public static function create(ContainerInterface $container) {
    return new static($container->get('project_list.list'));
  }

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

  public function json() {
    return new JsonResponse($this->projectListService->getTeaserData());
  }
}
